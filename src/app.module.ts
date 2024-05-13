import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, FileModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
