# Symptom Inform Platform
This repository contains a sample application to submit medical symptoms

## Form Handler
![Highlevel-Design](docs/form-submit-flow.jpeg?raw=true "Highlevel Design")

This module contians the form submission data
1. Guidelines to create HTML https://izifortune.com/serverless-website-sam-aws/
2. Guidelines to create a HTTP endpoint and need to add it to same CloudFront distribution as above 
https://aws.amazon.com/blogs/compute/working-with-aws-lambda-and-lambda-layers-in-aws-sam/

## Deploying Frontend Code
You can use the following command (Inside Frontend Folder) to deploy the latest frontend changes to S3 bucket
aws s3 sync . s3://mybucketname

## Deploying Backend Code
You can use the AWS SAM commands to build and deploy the API
e.g
sam deploy