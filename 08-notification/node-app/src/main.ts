import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get(ConfigService);
  const appDomain = configService.get('APP_DOMAIN', 'localhost');
  const realm = configService.get('KC_REALM', 'znu');

  const config = new DocumentBuilder()
    .setTitle('NestJs API Documentation')
    .setDescription('Backend API for the NestJs application.')
    .setVersion('1.0')
    .addServer(`http://${appDomain}/node`, 'Local environment via Nginx')
    .addServer('http://localhost:3000', 'Local environment direct')
    .addServer(`http://${appDomain}:3000`, 'Local environment direct')
    .addOAuth2(
      {
        type: 'oauth2',
        description:
          'For more information, see https://api.slack.com/docs/oauth',
        flows: {
          clientCredentials: {
            tokenUrl: `http://${appDomain}/auth/realms/${realm}/protocol/openid-connect/token`,
            scopes: {
              openid: 'OpenID Connect',
              profile: 'Profile',
              email: 'Email',
            },
          },
        },
      },
      'OAuth2',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
