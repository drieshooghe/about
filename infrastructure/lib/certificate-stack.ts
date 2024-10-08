import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone, type IHostedZone } from 'aws-cdk-lib/aws-route53';
import type { Construct } from 'constructs';
import { Stack, type StackProps } from './constructs';

export class CertificateStack extends Stack {
  public readonly hostedZone: IHostedZone;
  public readonly websiteCertificate: Certificate;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, { ...props, env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1' } });

    const domainName = 'drieshooghe.com';

    this.hostedZone = HostedZone.fromLookup(this, 'WebsiteHostedZone', { domainName });

    this.websiteCertificate = new Certificate(this, 'WebsiteCertificate', {
      domainName,
      subjectAlternativeNames: [`www.${domainName}`],
      validation: CertificateValidation.fromDns(this.hostedZone),
    });
  }
}
