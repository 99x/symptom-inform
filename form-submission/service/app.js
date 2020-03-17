// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context, callback) => {
    console.log(event);
    console.log(event.body);
    try {
        var params = {
            TableName: tableName,
            Item: {
                Id: uuid.v4(),
                CreatedAt: (new Date().getTime()).toString(),
                Symptoms: event.body
            }
        }

        const data = await dynamoDb.put(params).promise();
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Form submission succesfull! TableName:' + tableName,
                data: data
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};
