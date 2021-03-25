const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const dotenv = require('dotenv');
dotenv.config();

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_BUCKET;

//console.log('Bucket Name: ', BUCKET_NAME);

const S3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (file) => {

    const fileName = path.basename(file)
    const fileContent = fs.readFileSync(file);

    const params = {
        Bucket: BUCKET_NAME, 
        Key: fileName,
        Body: fileContent
    };

    S3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log('File Uploaded Succcessfully! ${data.Location}');
    });
};

uploadFile('hello.txt');