import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException, NotFoundException } from 'src/errors/errors.error';

@Injectable({})
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        const categories = await this.prisma.category.findMany();

        return { categories: categories };
    }

    async getById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: { id: id },
        });

        if (!category) throw new NotFoundException('Category not found');

        return { category: category };
    }

    async create(dto: CreateCategoryDto) {
        try {
            const category = await this.prisma.category.create({
                data: dto,
            });

            return { message: 'Category created succesfully', category: category };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Category already exists');
                }
            }
        }
    }

    async deleteById(id: string) {
        await this.prisma.category.delete({ where: { id } });

        return { message: 'Category deleted' };
    }
}
