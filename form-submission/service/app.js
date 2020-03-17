const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.lambdaHandler = async (event) => {

    try {

        var params = {
            TableName: tableName,
            Item: {
                Id: uuid.v4(),
                CreatedAt: (new Date().getTime()).toString(),
                FormData: JSON.parse(event.body)
            }
        }

        await dynamoDb.put(params).promise();

        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'Form submission succesfull!'
            })
        };

    } catch (err) {
        return err;
    }
};
