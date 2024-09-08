import type { App } from 'aws-cdk-lib';

export class InvalidTargetException extends Error {}

export enum Target {
  INFRASTRUCTURE = 'infrastructure',
  WEBSITE = 'website',
}

interface Context {
  target: Target;
}

export const getContext = (app: App): Context => {
  const target = app.node.tryGetContext('target') as Context['target'];

  switch (target) {
    case 'infrastructure':
      return { target: Target.INFRASTRUCTURE };
    case 'website':
      return { target: Target.WEBSITE };
    default:
      throw new InvalidTargetException();
  }
};
