'use strict';

const AWS = require("aws-sdk");
const dynamodbLocal = require("dynamodb-localhost");

AWS.config.update({
    region: "us-west-1",
    endpoint: "http://localhost:8000"
});

exports.setup = async () => {
    try {

        return await new Promise((resolve, reject) => {

            var dynamodb = new AWS.DynamoDB();
            var params = {
                TableName: "Local_Form_Data",
                KeySchema: [
                    { AttributeName: "Id", KeyType: "HASH" },
                    { AttributeName: "CreatedAt", KeyType: "RANGE" }
                ],
                AttributeDefinitions: [
                    { AttributeName: "Id", AttributeType: "S" },
                    { AttributeName: "CreatedAt", AttributeType: "S" }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            };

            dynamodb.createTable(params, (error, data) => {
                if (error) {
                    console.log(`Create table error=${error.stack}`);
                    reject(error);
                } else {
                    console.log(`Create table success=${JSON.stringify(data)}`);
                    resolve(data);
                }
            });

        });

    } catch (err) {
        return err;
    }

};