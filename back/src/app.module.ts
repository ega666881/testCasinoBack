import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TowerModule } from './tower/tower.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/schemas/user.schema';
// import { TowerSession, TowerSessionSchema } from './tower/schemas/tower.schema';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    TowerModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/tower'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      // { name: TowerSession.name, schema: TowerSessionSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
