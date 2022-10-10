import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TokenMiddleware } from 'src/utils/middlewares/token.middleware';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: 'root',
      password: '#NAHeem199',
      database: 'lendqr',
      entities: [UserEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    return consumer
      .apply(TokenMiddleware)
      .exclude(
        { path: '/api/v1/auth/login', method: RequestMethod.POST },
        { path: '/api/v1/auth/register', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
