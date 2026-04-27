import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
// import { KeycloakConnectModule, TokenValidation } from 'nest-keycloak-connect';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    // KeycloakConnectModule.register({
    //   authServerUrl: 'http://demo-app.local/auth',
    //   realm: 'znu',
    //   clientId: 'nest-app',
    //   secret: 'TFA3KpqdUsDR7Grzw7J8H13NXjleq2yP',
    //   tokenValidation: TokenValidation.OFFLINE,
    //   realmPublicKey:
    //     'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlBhX/PM88zu7lAh7XVaE8KYpljenXiwVHzTpSIPfq5JK/KQkl9o03nsm3VPABY3Zo9rrhgNsMdO89Yvp330etegJYWlXozVutBTCliPQpD9BSJs+IpifY0DWWX28Cj47JKM5tAalfTEqvih6MhyGnjSOFe6FoFtXhMQzfAo/ozt2njo44u460jON/2rhokfeHGqsLZkeuwYvtG0WfqjNgCTR+KO7UgGl9l3aWOGihsLPz5JUfjJy8FlUGYDMSHiV7KhHGUZp1ZgyUfC3dMvjtxwIiijHvNVvrrLu5AG00ilQMH8tYM1BBz+LtOdihcP/5AQEbLDMvDE5InuHBQnquwIDAQAB',
    // }),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
