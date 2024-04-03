import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubCategoryService } from './subCategory.service';
import { CreateSubCategoryDto } from './dto/create.dto';

@Controller('subCategories')
export class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService) {}

    @Get()
    getAll() {
        return this.subCategoryService.getAll();
    }

    @Post()
    create(@Body() dto: CreateSubCategoryDto) {
        return this.subCategoryService.create(dto);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.subCategoryService.getById(id);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.subCategoryService.deleteById(id);
    }
}
