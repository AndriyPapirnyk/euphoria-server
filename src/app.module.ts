import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
const uri = process.env.MONGO_URI || 'mongodb+srv://papirnyk11:8Vat1VOfgjQ5IDRd@euphoria.zhbc2f5.mongodb.net/?retryWrites=true&w=majority&appName=euphoria';

@Module({
  imports: [MongooseModule.forRoot(uri), UserModule, AuthModule],
})
export class AppModule {}
