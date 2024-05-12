import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllUser() {
    return await this.productService.getAllProducts();
  }

  @Post()
  async createTask(@Body() data: Product) {
    return await this.productService.createProduct(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userFound = await this.productService.getProductByID(Number(id));
    if (!userFound) {
      throw new NotFoundException('Product not found');
    }
    return userFound;
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    try {
      return await this.productService.deleteProduct(Number(id));
    } catch (error) {
      throw new NotFoundException('Product does not exist');
    }
  }

  @Put(':id')
  async updateUserById(@Param('id') id: string, @Body() data: Product) {
    return await this.productService.updateProduct(Number(id), data);
  }
}
