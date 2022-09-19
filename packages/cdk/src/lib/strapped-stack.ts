import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecra from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as efs from 'aws-cdk-lib/aws-efs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface StrappedStackProps extends cdk.StackProps
{
    domainName:string;
}

export class StrappedStack extends cdk.Stack {

    private readonly volumeName='data-volume';

    private readonly strapiPort=8080;

    private readonly domain:string;

    constructor(scope: Construct, id: string, props: StrappedStackProps) {

        super(scope, id, props);

        this.domain=props.domainName

        const vpc = new ec2.Vpc(this, 'vpc');

        const mediaBucket = new s3.Bucket(this, 'media-bucket', {
            publicReadAccess: true,
        });

        const bucketUser=new iam.User(this,'MediaUser');

        const accessKey=new iam.CfnAccessKey(this,'MediaUserAccessKey',{
            userName:bucketUser.userName
        });

        mediaBucket.grantReadWrite(bucketUser);
        mediaBucket.grantPutAcl(bucketUser);

        const env=this.createEnv(mediaBucket,accessKey);



        const fs = new efs.FileSystem(this, 'DbFs', {
            vpc,
            performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
            encrypted:true,
            enableAutomaticBackups:false
        });

        const accessPoint = fs.addAccessPoint('StrapiAccessPoint', {
            path: '/strapi-data',
            createAcl: {
                ownerGid: '1000',
                ownerUid: '1000',
                permissions: '700',
            },
            posixUser: {
                uid: '1000',
                gid: '1000',
            },

        });


        const volume:ecs.Volume={
            name:this.volumeName,
            efsVolumeConfiguration:{
                fileSystemId:fs.fileSystemId,
                transitEncryption: 'ENABLED',
                authorizationConfig: {
                    accessPointId: accessPoint.accessPointId,
                    iam:'ENABLED'
                }
            }
        }

        const task=new ecs.FargateTaskDefinition(this,'StrapiTask',{
            cpu:1024,
            memoryLimitMiB:2048,
            volumes:[volume],
            runtimePlatform:{
                cpuArchitecture:ecs.CpuArchitecture.ARM64,
                operatingSystemFamily:ecs.OperatingSystemFamily.LINUX
            }
        });

        mediaBucket.grantReadWrite(task.taskRole);


        const container=task.addContainer('StrapiContainer',{
            image:ecs.ContainerImage.fromAsset('../strapi',{
                platform:ecra.Platform.LINUX_ARM64
            }),
            environment: env,
            logging:new ecs.AwsLogDriver({
                streamPrefix: "StrApiFargateTask",
                logRetention: 30
            }),
            portMappings:[{hostPort:this.strapiPort,containerPort:this.strapiPort}],

        });

        container.addMountPoints({
            readOnly:false,
            containerPath:'/mnt/db-fs',
            sourceVolume:volume.name
        });

        const cert=new acm.Certificate(this,'StrapiCert',{
            domainName:this.domain,
            validation:acm.CertificateValidation.fromDns(),
        });
        new cdk.CfnOutput(this,'ApiUrl',{value:`https://${this.domain}`});


        const loadBalancer=new ecsp.ApplicationLoadBalancedFargateService(this,'StrappedLoadBalancer',{
            vpc,
            runtimePlatform:{
                cpuArchitecture:ecs.CpuArchitecture.ARM64,
                operatingSystemFamily:ecs.OperatingSystemFamily.LINUX
            },
            certificate:cert,
            taskDefinition:task,
            publicLoadBalancer: true,
            //redirectHTTP:true,
        });

        loadBalancer.targetGroup.configureHealthCheck({
            port:String(this.strapiPort),
            path:'/',
            interval:cdk.Duration.seconds(10),
            healthyThresholdCount:2,
            healthyHttpCodes:'200-399'
        })

        mediaBucket.grantReadWrite(loadBalancer.taskDefinition.taskRole);
        mediaBucket.grantPutAcl(loadBalancer.taskDefinition.taskRole);

        fs.connections.allowDefaultPortFrom(loadBalancer.service);
    }

    createEnv(mediaBucket:s3.Bucket, accessKey:iam.CfnAccessKey)
    {

        const adminJwtSecret = new secrets.Secret(this, 'jwt');
        const jwtSecret = new secrets.Secret(this, 'jwt2');
        const apiTokeSalt = new secrets.Secret(this, 'salt');
        const appKey1 = new secrets.Secret(this, 'appKey1', {
            generateSecretString: {
                excludePunctuation: true,
            },
        });
        const appKey2 = new secrets.Secret(this, 'appKey2', {
            generateSecretString: {
                excludePunctuation: true,
            },
        });


        return {
            ADMIN_JWT_SECRET:adminJwtSecret.secretValue.unsafeUnwrap(),
            JWT_SECRET: jwtSecret.secretValue.unsafeUnwrap(),
            API_TOKEN_SALT: apiTokeSalt.secretValue.unsafeUnwrap(),
            APP_KEYS: `${appKey1.secretValue.unsafeUnwrap()},${appKey2.secretValue.unsafeUnwrap()}`,
            DATABASE_FILENAME: '/mnt/db-fs/strapi.db',
            // HOST:'yrm4qg2yoypd6iu2xu5y3kn6s40hbkkm.lambda-url.us-east-1.on.aws',
            PORT:String(this.strapiPort),
            //NODE_ENV:'production',
            AWS_BUCKET: mediaBucket.bucketName,
            AWS_BUCKET_ACCESS_KEY_ID:accessKey.ref,
            AWS_BUCKET_ACCESS_SECRET:accessKey.attrSecretAccessKey,
            AWS_BUCKET_REGION: this.region,
            __V:'1',
        }
    }
}



