import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException, NotFoundException } from 'src/errors/errors.error';
import { CreateSubCategoryDto } from './dto/create.dto';

@Injectable({})
export class SubCategoryService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        const subCategories = await this.prisma.subCategory.findMany();

        return { subCategories };
    }

    async getById(id: string) {
        const subCategory = await this.prisma.subCategory.findUnique({
            where: { id: id },
        });

        if (!subCategory) throw new NotFoundException('Subcategory not found');

        return { subCategory };
    }

    async create(dto: CreateSubCategoryDto) {
        try {
            const subCategory = await this.prisma.subCategory.create({
                data: dto,
            });

            return { message: 'Subcategory created succesfully', subCategory };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Category already exists');
                }
            }
        }
    }

    async deleteById(id: string) {
        await this.prisma.subCategory.delete({ where: { id } });

        return { message: 'Subcategory deleted' };
    }
}
