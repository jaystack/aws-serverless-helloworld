const s3 = require('@aws-cdk/aws-s3');
const s3deploy = require('@aws-cdk/aws-s3-deployment');
const cdk = require('@aws-cdk/core');
const lambdaNode = require('@aws-cdk/aws-lambda-nodejs');
const { S3EventSource } = require('@aws-cdk/aws-lambda-event-sources');
class HelloServerlessWorldStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    })

    const deployment = new s3deploy.BucketDeployment(this, 'DeployWebsiteContent', {
      sources: [s3deploy.Source.asset('./website')],
      destinationBucket: websiteBucket,
    })


    const lambdaFn = new lambdaNode.NodejsFunction(this, 'lambda', {
        entry: './lambda/handler.js',
        handler: 'handle',
    })    

    websiteBucket.grantReadWrite(lambdaFn);
    
    lambdaFn.addEventSource(new S3EventSource(websiteBucket, {
      events: [s3.EventType.OBJECT_CREATED],
    }))

    
  }
}

module.exports = { HelloServerlessWorldStack }
