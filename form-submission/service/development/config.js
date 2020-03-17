'use strict';

exports.init = (AWS) => {
    let endpoint;

    if (process.env.AWS_SAM_LOCAL) {
        endpoint = 'http://DynamoDBEndpoint:8000'
    } else if (!process.env.AppEnv) {
        endpoint = 'http://localhost:8000'
    }

    AWS.config.update({
        region: "us-west-1",
        endpoint: endpoint
    });

    process.env.TABLE_NAME = process.env.TABLE_NAME || "Local_Form_Data";
};