import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdpipeline from 'aws-cdk-lib/pipelines';
import { CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdAwsPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdpipeline.CodePipeline(this, 'Pipeline', {
      pipelineName: "CDK Test Pipeline",
      synth : new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('SahilGupta2810/ci-cd-aws-pipeline','release-1'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    })
  }
}
