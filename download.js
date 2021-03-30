const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_BUCKET;

const S3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
})

const downloadFile = (file) => {

    const fileName = path.basename(file)

    const params = {
        Bucket: BUCKET_NAME, 
        Key: fileName,
    };

    S3.getObject(params, function(err, data) {
        if (err) {
            throw err;
        }

        fs.writeFileSync(`./${fileName}`, data.Body)
        console.log(`File Downloaded Succcessfully!`);
    });
};

downloadFile('hello.txt');