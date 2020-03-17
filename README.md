# Symptom Inform Platform
This repository contains a sample application to submit medical symptoms

## Form Handler
![Highlevel-Design](docs/form-submit-flow.jpeg?raw=true "Highlevel Design")

This module contians the form submission data
1. Guidelines to create HTML https://izifortune.com/serverless-website-sam-aws/
2. Guidelines to create a HTTP endpoint and need to add it to same CloudFront distribution as above 
https://aws.amazon.com/blogs/compute/working-with-aws-lambda-and-lambda-layers-in-aws-sam/
3. Current submit api implements a GET method, modify it to work for POST.

## Deploying Frontend Code
You can use the following command (Inside Frontend Folder) to deploy the latest frontend changes to S3 bucket
aws s3 sync . s3://mybucketname

Clear the cache
aws cloudfront create-invalidation \
    --distribution-id EDFDVBD6EXAMPLE \
    --paths "/*"

## Deploying Backend Code
You can use the AWS SAM commands to build and deploy the API
e.g
sam deploy --parameter-overrides APIBasePath=api AppEnv=Dev

## Running dynamodb locally
Create a bridge network for Sam container communication
 docker network create -d bridge sam-local

Download and run DynamoDB docker container
 docker run -p 8000:8000 --network sam-local --name dynamodb amazon/dynamodb-local

Go to form-submissions/service and execute the following to create the Dynamodb tables
npm run dynamodb

Invoke lambda function locally
sam local invoke --docker-network sam-local FormDataLambda --event events/event.json


### Other Tools (Working with DynamoDB Local)

To view all the tables use following command in CLI
aws dynamodb list-tables --endpoint-url http://localhost:8000 --region us-west-1

View table data
 aws dynamodb scan --table-name Form_Data --endpoint-url http://localhost:8000 --region us-west-1

