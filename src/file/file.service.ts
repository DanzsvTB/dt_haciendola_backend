import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async importCsvProducts(data: Product[]): Promise<Prisma.BatchPayload> {
    const result = await this.prisma.product.createMany({
      data,
    });
    return result;
  }
}
//
