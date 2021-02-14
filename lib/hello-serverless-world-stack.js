const sns = require('@aws-cdk/aws-sns');
const subs = require('@aws-cdk/aws-sns-subscriptions');
const sqs = require('@aws-cdk/aws-sqs');
const cdk = require('@aws-cdk/core');

class HelloServerlessWorldStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'HelloServerlessWorldQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'HelloServerlessWorldTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}

module.exports = { HelloServerlessWorldStack }
