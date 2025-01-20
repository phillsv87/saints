import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { StaticWebSite } from "./StaticWebSite";

export interface StrappedFrontendStackProps
{
    frontendDomain:string;
    coachMeDomain:string;
}

export class StrappedFrontendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StrappedFrontendStackProps & cdk.StackProps) {
        super(scope, id, props);

        new StaticWebSite(this,'Saints',{
            domainName:props.frontendDomain,
            cdn:true,
            nxExportedPackage:'frontend',
        })

        // new StaticWebSite(this,'CoachMe',{
        //     domainName:props.coachMeDomain,
        //     cdn:true,
        //     nxExportedPackage:'coach-me',
        // })

        // new RedirectApi(this,'Redirects',{
        //     fallbackDomain:'www',
        //     redirects:[
        //         {
        //             fromDomain:'saintsnewyork.com',
        //             toDomain:'www.saintsnewyork.com',
        //         }
        //     ]
        // })
    }
}
