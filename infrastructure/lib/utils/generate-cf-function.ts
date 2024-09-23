import { readFileSync } from 'node:fs';
import { transformSync } from 'esbuild';

type FunctionType = 'cloudfront';

export const generateFunctionCode = (type: FunctionType, path: string): string => {
  const functionContent = readFileSync(path, 'utf-8');

  switch (type) {
    case 'cloudfront': {
      const { code } = transformSync(functionContent, {
        loader: 'ts',
        format: 'esm',
        minifyWhitespace: true,
        minifySyntax: true,
        target: 'es5',
        supported: {
          'const-and-let': true,
          'async-await': true,
        },
      });

      return code;
    }
    default:
      throw new Error(`Unsupported function type: ${type}`);
  }
};
