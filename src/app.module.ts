import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { JWTGlobalModule } from './jwt.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { RequestsEntity } from './entities/requests.entity';
import { RequestsModule } from './requests/requests.module';
import { FriendsEntity } from './entities/friends.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UsersEntity, RequestsEntity, FriendsEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    JWTGlobalModule,
    AuthModule,
    RequestsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
