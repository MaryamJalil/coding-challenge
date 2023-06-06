import { registerAs } from '@nestjs/config';

export const configuration = registerAs('app', () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      dbHost: process.env.DATABASE_HOST,
      dbPort: process.env.DATABASE_PORT,
      dbUsername: process.env.DATABASE_USER,
      dbPassword: process.env.DATABASE_PASSWORD,
      dbName: process.env.DATABASE_NAME,
      graphqlPlaygroundEnabled: process.env.GRAPHQL_PLAYGROUND_ENABLED,
    };
  } else {
    return {
      dbHost: process.env.DATABASE_HOST,
      dbPort: process.env.DATABASE_PORT,
      dbUsername: process.env.DATABASE_USER,
      dbPassword: process.env.DATABASE_PASSWORD,
      dbName: process.env.DATABASE_NAME,
      graphqlPlaygroundEnabled: process.env.GRAPHQL_PLAYGROUND_ENABLED,
    };
  }
});
