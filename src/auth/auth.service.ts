import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async signup(dto: SignUpDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: { ...dto, password: hash },
            });

            delete user.password;

            return { message: 'User created succesfully', user: user };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
        }
    }

    async login(dto: LoginDto) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
            if (!user) throw new ForbiddenException('Credentials incorrect');

            const pwMatches = await argon.verify(user.password, dto.password);
            if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

            delete user.password;

            const { token, expiresIn } = await this.signToken(user.id, user.email, user.role);
            return { user: user, access_token: token, expiresIn };
        } catch (error) {
            throw new InternalServerErrorException('Internal server error');
        }
    }

    async signToken(userId: string, email: string, role: string) {
        const payload = { sub: userId, email, role };
        const expiresIn = '60m';
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: expiresIn,
        });

        return { token, expiresIn };
    }
}
