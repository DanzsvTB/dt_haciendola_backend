import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  Query,
  Response,
  Patch,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateProductDto } from './dto/create.dto';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllProducts(
    @Query('_start') start: string,
    @Query('_end') end: string,
    @Response() res: Res,
  ) {
    const startIdx = start ? parseInt(start, 10) : 0;
    const endIdx = end ? parseInt(end, 10) : 10; // Valor por
    const products = await this.productService.getAllProducts(startIdx, endIdx);
    const totalCount = await this.productService.getTotalProductsCount();
    res.set('X-Total-Count', totalCount.toString());
    return res.send(products);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(@Body() data: Product) {
    // console.log(data);
    const newData: Prisma.ProductCreateInput = {
      title: data.title,
      handle: data.handle,
      description: data.description,
      sku: data.sku,
      grams: Number(data.grams),
      stock: Number(data.stock),
      price: Number(data.price),
      comparePrice: Number(data.comparePrice),
      barcode: data.barcode,
    };
    return await this.productService.createProduct(newData);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getProductById(@Param('id') id: string) {
    const userFound = await this.productService.getProductByID(Number(id));
    if (!userFound) {
      throw new NotFoundException('Product not found');
    }
    return userFound;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProductById(@Param('id') id: string) {
    try {
      return await this.productService.deleteProduct(Number(id));
    } catch (error) {
      throw new NotFoundException('Product does not exist');
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateProductById(@Param('id') id: string, @Body() data: Product) {
    const newData: Prisma.ProductUpdateInput = {
      title: data.title,
      handle: data.handle,
      description: data.description,
      sku: data.sku,
      grams: Number(data.grams),
      stock: Number(data.stock),
      price: Number(data.price),
      comparePrice: Number(data.comparePrice),
      barcode: data.barcode,
    };
    return await this.productService.updateProduct({
      where: {
        id: Number(id),
      },
      data: newData,
    });
  }
}
