import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';

@Controller('categories')
export class CategoryController {
    constructor(
        private prisma: PrismaService,
        private categoryService: CategoryService
    ) {}

    @Get()
    getAll() {
        return this.categoryService.getAll();
    }

    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.categoryService.getById(id);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.categoryService.deleteById(id);
    }
}
