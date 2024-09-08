import { Duration } from 'aws-cdk-lib';
import { Effect, OpenIdConnectProvider, PolicyStatement, Role, WebIdentityPrincipal } from 'aws-cdk-lib/aws-iam';
import type { Construct } from 'constructs';
import { Stack, type StackProps } from './constructs';

export class OperationsStack extends Stack {
  private readonly githubTokenDomain = 'token.actions.githubusercontent.com';
  private readonly repositoryName = 'drieshooghe/about';

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Register GitHub as an OIDC provider in the account
    const githubOIDCProvider = this.createOIDCProvider();
    this.createDeploymentRole(githubOIDCProvider);
  }

  private createOIDCProvider() {
    return new OpenIdConnectProvider(this, 'AboutGitHubOIDCProvider', {
      url: `https://${this.githubTokenDomain}`,
      clientIds: ['sts.amazonaws.com'],
    });
  }

  private createDeploymentRole(oidcProvider: OpenIdConnectProvider) {
    const role = new Role(this, 'AboutInfrastructureDeployRole', {
      roleName: 'AboutInfrastructureDeployRole',
      maxSessionDuration: Duration.hours(1),
      assumedBy: new WebIdentityPrincipal(oidcProvider.openIdConnectProviderArn, {
        StringLike: {
          [`${this.githubTokenDomain}:sub`]: `repo:${this.repositoryName}:*`,
        },
        StringEquals: {
          [`${this.githubTokenDomain}:aud`]: 'sts.amazonaws.com',
        },
      }),
    });

    role.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['sts:AssumeRole'],
        resources: [
          `arn:aws:iam::${this.account}:role/cdk-*-${this.account}-us-east-1`, // For the certificate-stack
          `arn:aws:iam::${this.account}:role/cdk-*-${this.account}-${this.region}`,
        ],
      }),
    );
  }
}
