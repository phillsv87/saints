#!/bin/bash
source "$(dirname "$0")/config.sh"
set -e

KEY=$1
STACK_NAME=Strapped

OUTPUT=`aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --output json \
    --query "Stacks[0].Outputs"`

node --harmony << EOF
const formats=['json','env']
const outputs=$OUTPUT.reduce((c,n)=>(c[n.OutputKey]=n.OutputValue,c),{});
const key='$KEY'
if(key && !formats.includes(key)){
    if(!outputs[key]){
        throw new Error('No output found by key: '+key)
    }
    console.log(outputs[key])
}else{
    switch(key){

        case 'env':
            for(const e in outputs){
                console.log(e.toUpperCase()+'='+outputs[e]);
            }
            break;

        case 'json':
        default:
            console.log(JSON.stringify(outputs,null,4));
            break;
    }
}
EOF
