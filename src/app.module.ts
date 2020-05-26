import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb+srv://tigersama:YlhFw5VEqdJuDK72@cluster0-wwhcx.mongodb.net/nest-demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
