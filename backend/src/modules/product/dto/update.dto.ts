import { IsString, IsOptional, IsNumber, IsInt, IsUUID } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsInt()
    @IsOptional()
    quantity: number;

    @IsNumber()
    @IsOptional()
    discount: number;

    @IsUUID()
    @IsOptional()
    subCategoryId: string;
}
