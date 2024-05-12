import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './file.controller';
import { ProductModule } from 'src/product/product.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileService } from './file.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ProductModule,
    PrismaModule,
  ],
  controllers: [FilesController],
  providers: [FileService],
})
export class FileModule {}
