import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProductDto } from './dto/update.dto';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    getAll() {
        return this.productService.getAll();
    }

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.productService.getById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.productService.update(id, dto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.productService.deleteById(id);
    }
}
