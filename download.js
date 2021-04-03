const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_BUCKET;

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const S3 = new AWS.S3({
})

const lambda = new AWS.Lambda({}); 

const downloadFile = (file) => {

    const fileName = path.basename(file)

    const S3Params = {
        Bucket: BUCKET_NAME, 
        Key: fileName,
    };

    const lambdaParams = {
        FunctionName: 'hellWorldDownloaded'
    }

    S3.getObject(S3Params, function(err, data) {
        if (err) {
            throw err;
        }

        fs.writeFileSync(`./${fileName}`, data.Body)
        console.log(`File Downloaded Succcessfully!`);

        lambda.invoke(lambdaParams, function(err, data) {
            if (err) {
                throw err;
            }
            console.log('Lambda Invoked!')
        })
    });
};

downloadFile('hello.txt');