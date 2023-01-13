import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdpipeline from 'aws-cdk-lib/pipelines';
import { CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CiCdAwsPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new cdpipeline.CodePipeline(this, 'Pipeline', {
      pipelineName: "Test_Pipeline_CDK",
      synth : new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('SahilGupta2810/ci-cd-aws-pipeline','release-1'),
        commands: [
          'npm i',
          'npm run build',
          'cdk synth'
        ]
      })
    })

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test"));

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod"));

  }
}
