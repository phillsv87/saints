# Strapped
Deploy Strapi on a strapped budget.

## What is Strapped
Strapped is a CDK application that deploys a Strapi backend, NextJS frontend and CD/CI pipeline
to AWS.

## Install
Run **( npm run install-all )** to install all dependencies in all projects,
including the root projects

## AWS Credentials
Follow the the standard AWS CLI credentials instructions to setup your AWS credentials.

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html


## A quick note
Example code and links use the default region of **us-east-1**. Be sure to replace with your region.

## Configuration
All configuration values are stored in the .env file at the root of the repo.
Make sure to update and review before first deployment.

``` properties
# .env

# GitHub Username
NX_GITHUB_OWNER=exampleGitHubUserName

# Repo name
NX_GIT_REPO=exampleRepoName

# ARN of a GitHub connector - https://us-east-1.console.aws.amazon.com/codesuite/settings/connections
NX_REPO_CONNECTION_ARN=arn:aws:codestar-connections:REGION:ACCOUNT:connection/ID

# Branch to follow and deploy updates for
NX_BRANCH=main

# API Domain
NX_API_DOMAIN=api.example.com

# Frontend Domain
NX_FRONTEND_DOMAIN=app.example.com

# Email address used to send transactional emails from
NX_EMAIL_ADDRESS=hello@example.com

# AWS profile - Set both NX_AWS_PROFILE and AWS_PROFILE
NX_AWS_PROFILE=default
AWS_PROFILE=default

# AWS region - Set both NX_AWS_REGION and AWS_REGION
NX_AWS_REGION=us-east-1
AWS_REGION=us-east-1

# When true deployment of the backend is enabled
NX_ENABLE_BACKEND=true

# When true deployment of the frontend is enabled
NX_ENABLE_FRONTEND=true
```

## Local Developer Configuration
Local developer specific configuration can be defined in the .env.local file.

``` properties
# .env.local

# Local AWS profile - Set both NX_AWS_PROFILE and AWS_PROFILE
NX_AWS_PROFILE=bob
AWS_PROFILE=bob

```

## DNS verification and configuration
During the first deployment of the pipeline you will need to complete DNS verification and configuration. DNS  verification consists of adding a CNAME record to your frontend and backend
domains. You can view the CNAME values in the certificate manager - https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/list.


Once the pipeline has deployed you will then add CNAME records to point your frontend and backend
domains to their corresponding aws domains.

## Pipeline Initialization
To initialization the pipeline for the current branch run **( scripts/create-pipeline-for-branch.sh )**.
Once initialized pushes to the branch will be automatically deployed.
