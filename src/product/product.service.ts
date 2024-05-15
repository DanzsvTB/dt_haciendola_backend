import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create.dto';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(start: number, end: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      skip: start,
      take: end - start,
    });
  }

  async getProductByID(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }
  async getTotalProductsCount(): Promise<number> {
    return this.prisma.product.count(); // Contamos todos los productos en la base de datos
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
