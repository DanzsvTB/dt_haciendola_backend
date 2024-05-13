import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';
import { FileService } from './file.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const results = [];

    createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Transforma las claves del objeto a minúsculas
        const transformedData = this.convertKeysToCamelCase(data);
        results.push(transformedData);
      })
      .on('end', () => {
        try {
          // console.log(results);
          this.fileService.importCsvProducts(results);
          return { message: 'File uploaded and processed' };
        } catch (error) {
          throw new BadRequestException('User does not exist');
        }
      });
  }

  private convertKeysToCamelCase(data: any): any {
    const transformedData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let value = data[key];
        if (['Grams', 'Stock', 'Price', 'Compare Price'].includes(key)) {
          value = Number(value);
        }
        const camelCaseKey = this.toCamelCase(key);
        transformedData[camelCaseKey] = value;
      }
    }
    return transformedData;
  }

  private toCamelCase(key: string): string {
    return key
      .toLowerCase()
      .replace(/([- _][a-z])/g, (group) =>
        group.toUpperCase().replace(/[- _]/g, ''),
      );
  }
}
