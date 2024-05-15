import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  handle: string;

  @IsString()
  description: string;

  @IsString()
  sku: string;

  @IsNumber()
  grams: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  price: number;

  @IsNumber()
  comparePrice: number;

  @IsString()
  barcode: string;
}
