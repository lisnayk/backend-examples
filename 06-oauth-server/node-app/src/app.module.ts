import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoriesModule} from './categories/categories.module';
import {ProductsModule} from './products/products.module';
import {
    KeycloakConnectModule,
    ResourceGuard,
    RoleGuard,
    AuthGuard, TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
@Module({
    imports: [
        KeycloakConnectModule.register({
            authServerUrl: 'http://localhost:8080',
            realm: 'znu',
            clientId: 'nest-app',
            secret: 'Qr0ybaE6CGArplrp8FIPGkwf1uj2WJo7',
            tokenValidation: TokenValidation.ONLINE, // optional
            // Secret key of the client taken from keycloak server
        }),
        // CatsModule,
        // TagsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'pguser',
            password: 'password',
            database: 'nestjs',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            autoLoadEntities: true,
        }),
        CategoriesModule,
        ProductsModule,
    ],
    controllers: [AppController],
    providers: [AppService,
        // This adds a global level authentication guard,
        // you can also have it scoped
        // if you like.
        //
        // Will return a 401 unauthorized when it is unable to
        // verify the JWT token or Bearer header is missing.
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        // This adds a global level resource guard, which is permissive.
        // Only controllers annotated with @Resource and
        // methods with @Scopes
        // are handled by this guard.
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        // New in 1.1.0
        // This adds a global level role guard, which is permissive.
        // Used by `@Roles` decorator with the
        // optional `@AllowAnyRole` decorator for allowing any
        // specified role passed.
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {
}
