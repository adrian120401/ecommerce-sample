import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, IsUUID } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsOptional()
    discount: number;

    @IsUUID()
    @IsNotEmpty()
    subCategoryId: string;
}
