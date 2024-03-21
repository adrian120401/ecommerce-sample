import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateSubCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsUUID()
    @IsNotEmpty()
    categoryId: string;
}
