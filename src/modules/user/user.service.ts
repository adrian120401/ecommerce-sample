import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedException } from 'src/errors/errors.error';
import { UpdateUserDto } from './dto/update.dto';

@Injectable({})
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getMe(req: Request) {
        const user = await this.prisma.user.findUnique({ where: { id: req['user'].sub } });
        delete user.password;
        delete user.activationToken;
        delete user.refreshToken;

        return { user };
    }

    async updateMe(req: Request, dto: UpdateUserDto) {
        const user = await this.prisma.user.update({
            where: { id: req['user'].sub },
            data: dto,
        });
        delete user.password;
        delete user.activationToken;
        delete user.refreshToken;

        return { user };
    }

    async getAll(req: Request) {
        if (req['user'].role === 'MEMBER') {
            throw new UnauthorizedException();
        }
        const users = await this.prisma.user.findMany();

        users.map((user) => {
            delete user.password;
            delete user.activationToken;
            delete user.refreshToken;
        });

        return { users };
    }

    async deleteMe(req: Request) {
        await this.prisma.user.delete({ where: { id: req['user'].sub } });

        return { message: 'User deleted' };
    }
}
