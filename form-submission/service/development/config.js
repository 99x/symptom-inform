'use strict';

exports.init = (AWS) => {

    if (process.env.AWS_SAM_LOCAL || !process.env.LAMBDA_TASK_ROOT) {
        AWS.config.update({
            region: "us-west-1",
            endpoint: process.env.AWS_SAM_LOCAL ? 'http://dynamodb:8000' : 'http://localhost:8000'
        });
        process.env.TABLE_NAME = process.env.TABLE_NAME || "Form_Data";
    }

};