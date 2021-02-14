const aws = require('aws-sdk');

async function handle(event, context) {
    console.log({ event, context });
    const { Records = [] } = event;
    const eventArgument = Records[0];

    if (!eventArgument) {
        return {
            event,
            context,
        }
    }
    console.log(JSON.stringify(eventArgument, null, 2));
    
    const { s3: { bucket: { name: Bucket }, object: { key: Key } }} = eventArgument;
    if (!Key === 'index.html') {
        console.log('non important file uploaded skipping');
        return;
    }
    const s3 = new aws.S3();
    const response = await s3.getObject({ Bucket, Key}).promise();
    let body = response.Body.toString();
    console.log({ body });

    if (/Tuesdya/.exec(body)) {
        console.log('Content needs correction');
        body = body.replace('Tuesdya', '<b>Tuesday</b>');        
        await s3.upload({ Bucket, Key, Body: body, ContentType: 'text/html', }).promise();
        console.log('Content updated');
    }
    
}

module.exports = {
    handle
}