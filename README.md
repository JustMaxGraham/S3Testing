npm install  

Need to have your own an S3 bucket ready & set up a .env file with the following:  

ENV file should include:  
AWS_ID=  
AWS_SECRET=  
AWS_BUCKET=  

run 'node upload.js' to upload the hello.txt file to your S3 bucket.  

run 'node download.js' to download the hello.txt file from your S3 bucket.  