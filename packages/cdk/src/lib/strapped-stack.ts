import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecra from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as iam from 'aws-cdk-lib/aws-iam';
//import * as efs from 'aws-cdk-lib/aws-efs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class StrappedStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const mediaBucket = new s3.Bucket(this, 'media-bucket', {
            publicReadAccess: true,
        });

        const bucketUser=new iam.User(this,'MediaUser');

        const accessKey=new iam.CfnAccessKey(this,'MediaUserAccessKey',{
            userName:bucketUser.userName
        });

        mediaBucket.grantReadWrite(bucketUser);
        mediaBucket.grantPutAcl(bucketUser);

        const vpc = new ec2.Vpc(this, 'vpc');

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

        // const fs = new efs.FileSystem(this, 'db-fs', {
        //     vpc,
        //     performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
        // });

        // const accessPoint = fs.addAccessPoint('lambda-access-point', {
        //     path: '/export/lambda',
        //     createAcl: {
        //         ownerGid: '1001',
        //         ownerUid: '1001',
        //         permissions: '750',
        //     },
        //     posixUser: {
        //         uid: '1001',
        //         gid: '1001',
        //     },
        // });

        const volumeName='data-volume';

        const strapiPort=80;

        const env={
            ADMIN_JWT_SECRET:adminJwtSecret.secretValue.unsafeUnwrap(),
            JWT_SECRET: jwtSecret.secretValue.unsafeUnwrap(),
            API_TOKEN_SALT: apiTokeSalt.secretValue.unsafeUnwrap(),
            APP_KEYS: `${appKey1.secretValue.unsafeUnwrap()},${appKey2.secretValue.unsafeUnwrap()}`,
            //DATABASE_FILENAME: '/mnt/db-fs/strapi.db',
            // HOST:'yrm4qg2yoypd6iu2xu5y3kn6s40hbkkm.lambda-url.us-east-1.on.aws',
            PORT:`${strapiPort}`,
            //NODE_ENV:'production',
            AWS_BUCKET: mediaBucket.bucketName,
            AWS_BUCKET_ACCESS_KEY_ID:accessKey.ref,
            AWS_BUCKET_ACCESS_SECRET:accessKey.attrSecretAccessKey,
            AWS_BUCKET_REGION: this.region,
        }


        // const volume:ecs.Volume={
        //     name:volumeName,
        //     efsVolumeConfiguration:{
        //         fileSystemId:fs.fileSystemId
        //     }
        // }

        const task=new ecs.FargateTaskDefinition(this,'StrapiTask',{
            //volumes:[volume],
            cpu:1024,
            memoryLimitMiB:2048
        });
        mediaBucket.grantReadWrite(task.taskRole);

        const logging = new ecs.AwsLogDriver({
            streamPrefix: "StrApiFargateTask",
            logRetention: 30
        })


        const container=task.addContainer('StrapiContainer',{
            image:ecs.ContainerImage.fromAsset('../strapi',{
                platform:ecra.Platform.LINUX_AMD64
            }),
            environment: env,
            logging,
            portMappings:[{hostPort:strapiPort,containerPort:80}],
        });

        // container.addMountPoints({
        //     readOnly:false,
        //     containerPath:'/mnt/db-fs',
        //     sourceVolume:volume.name
        // });


        const loadBalancer=new ecsp.ApplicationLoadBalancedFargateService(
            this,
            'StrappedLoadBalancer',
            {
                vpc,
                deploymentController: {
                    type: ecs.DeploymentControllerType.CODE_DEPLOY,
                },
                //desiredCount: 1,
                runtimePlatform:{
                    cpuArchitecture:ecs.CpuArchitecture.X86_64,
                    operatingSystemFamily:ecs.OperatingSystemFamily.LINUX
                },
                taskDefinition:task,
                publicLoadBalancer: true,
            }
        );

        mediaBucket.grantReadWrite(loadBalancer.taskDefinition.taskRole);
        mediaBucket.grantPutAcl(loadBalancer.taskDefinition.taskRole);

        //fs.connections.allowDefaultPortFrom(loadBalancer.service);


    }
}
