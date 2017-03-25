#!/bin/bash

if [ -z $AWS_BUCKET ] || [ -z $AWS_ACCESS_KEY_ID ] || [ -z $AWS_SECRET_ACCESS_KEY ]; then
  echo "You must set the AWS_BUCKET, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars";
  exit 1;
fi

trap "echo Deployment failed." EXIT

npm run build

# Deploy
cd build
aws s3 sync . s3://$AWS_BUCKET --acl public-read

echo "Deployment to $AWS_BUCKET succeeded"
