import { Injectable } from '@nestjs/common';
import { ForbiddenException, NotFoundException } from 'src/errors/errors.error';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProductDto } from './dto/update.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        const products = await this.prisma.product.findMany();

        return { products };
    }

    async getById(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: id },
        });

        if (!product) throw new NotFoundException('Product not found');

        return { product };
    }

    async create(dto: CreateProductDto) {
        try {
            const product = await this.prisma.product.create({
                data: dto,
            });

            return { message: 'Product created succesfully', product };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Category already exists');
                }
            }
        }
    }

    async update(id: string, dto: UpdateProductDto) {
        const checkProduct = await this.prisma.product.findUnique({
            where: { id },
        });

        if (!checkProduct) throw new NotFoundException('Product not found');
        const product = await this.prisma.product.update({
            where: { id },
            data: dto,
        });

        return { product };
    }

    async deleteById(id: string) {
        await this.prisma.product.delete({ where: { id } });

        return { message: 'Product deleted' };
    }
}
