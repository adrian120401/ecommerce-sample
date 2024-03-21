import { Module } from '@nestjs/common';
import { SubCategoryController } from './subCategory.controller';
import { SubCategoryService } from './subCategory.service';

@Module({
    imports: [],
    controllers: [SubCategoryController],
    providers: [SubCategoryService],
})
export class SubCategoryModule {}
