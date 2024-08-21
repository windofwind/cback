import { INestiaConfig } from '@nestia/sdk';

const config: INestiaConfig = {
  input: ['src/**/*.controller.ts'],
  swagger: {
    decompose: true,
    output: 'swagger.json',
    security: {
      apiKey: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
      },
    },
    info: {
      version: '1.0.0',
      title: 'cback API',
      description: `cback API Document
      `,
      contact: {
        name: 'dona',
        url: 'https://addline.info',
        email: 'windofwind@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'local Server',
      },
    ],
  },
  e2e: 'test/e2e',
  output: 'test/e2e/api',
};

export default config;
