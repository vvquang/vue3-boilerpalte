import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
// import { AUTH_OPTIONS, TOKEN_NAME } from '@/auth';

/**
 * The url endpoint for open api ui
 * @type {string}
 */
export const SWAGGER_API_ROOT: string = 'api/docs';
/**
 * The name of the api
 * @type {string}
 */
export const SWAGGER_API_NAME = 'API';
/**
 * A short description of the api
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION = 'API Description';
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = '1.0';

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const configSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    // .addBearerAuth(AUTH_OPTIONS, TOKEN_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
};
