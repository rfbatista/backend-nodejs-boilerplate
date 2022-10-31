import { envNumber, envString } from "@infrastructure/config/environment";

const config = {
  applicationName: envString("APPLICATION_NAME"),
  env: envString("NODE_ENV"),
  http: {
    port: envNumber("PORT", 3000),
    host: envString("HOST", "localhost"),
  },
  logger: {
    level: envString("LOG_LEVEL", "debug"),
    hostname: {
      prefix: envString("HOST_NAME", "local")
    }
  },
  dataSource: {},
  aws: {
    cognito: {
      userPoolId: envString("AWS_USER_POOL_ID"),
      clientId: envString("AWS_CLIENT_ID"),
      region: envString("AWS_COGNITO_REGION")
    }
  }
};

export { config };
