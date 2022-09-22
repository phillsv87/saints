import * as cdk from "aws-cdk-lib";
import * as cm from "aws-cdk-lib/aws-certificatemanager";
import * as cf from "aws-cdk-lib/aws-cloudfront";
import * as cfo from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from "constructs";
// import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as efs from 'aws-cdk-lib/aws-efs';
// import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as secrets from 'aws-cdk-lib/aws-secretsmanager';

export interface StrappedFrontendStackProps
{
    frontendDomain:string;
}

export class StrappedFrontendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StrappedFrontendStackProps & cdk.StackProps) {
        super(scope, id, props);

        this.createWebSite('frontend',props.frontendDomain);
    }

    createWebSite(name: string, domainName:string|null){

        let certificate:cm.Certificate|undefined=undefined;

        if(domainName){
            certificate = new cm.Certificate(this, "CustomDomainCertificate", {
                domainName: domainName,
                validation: cm.CertificateValidation.fromDns()
            });
            new cdk.CfnOutput(this,`websiteDomain00${name}`,{value:domainName});
        }

        const bucket=new s3.Bucket(this,'website-'+name,{
            accessControl:s3.BucketAccessControl.PRIVATE,
            autoDeleteObjects:true,
            removalPolicy:cdk.RemovalPolicy.DESTROY
        });

        new s3Deployment.BucketDeployment(this,`website-${name}-deployment`,{
            destinationBucket:bucket,
            sources:[
                s3Deployment.Source.asset(`../../dist/packages/${name}/exported`)
            ]
        });

        const originAccessIdentity=new cf.OriginAccessIdentity(this, `website-${name}-origin-ident`);
        bucket.grantRead(originAccessIdentity);

        const dist=new cf.Distribution(this, `website-${name}-distribution`, {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin:new cfo.S3Origin(bucket,{originAccessIdentity}),
            },
            certificate,
            domainNames:domainName?[domainName]:undefined
        });

        new cdk.CfnOutput(this,`websiteUrl00${name}`,{value:`https://${dist.domainName}`});

    }
}
