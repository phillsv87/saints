import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as efs from 'aws-cdk-lib/aws-efs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class StrappedStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc=new ec2.Vpc(this,"vpc");

    const fs=new efs.FileSystem(this,"db-fs",{
      vpc,
      performanceMode:efs.PerformanceMode.GENERAL_PURPOSE
    });

    const accessPoint=fs.addAccessPoint("lambda-access-point",{
      path:'/export/lambda',
      createAcl:{
        ownerGid:"1001",
        ownerUid:"1001",
        permissions:"750"
      },
      posixUser:{
        uid:"1001",
        gid:"1001"
      }
    })

    new lambda.Function(this,'strapi',{
      runtime: lambda.Runtime.NODEJS_14_X,
      architecture: lambda.Architecture.ARM_64,
      vpc,
      filesystem:lambda.FileSystem.fromEfsAccessPoint(accessPoint,"/mnt/db-fs"),
      code: lambda.Code.fromAsset(`../../dist/packages/strapi`),
      handler: `main.handler`,
    })
  }
}
