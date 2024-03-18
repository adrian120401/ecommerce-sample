import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from 'src/errors/errors.error';
import { randomUUID } from 'crypto';
import { envs } from 'src/config/envs';
import { RefreshTokenDto } from './dto/refresh.dto';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async signup(dto: SignUpDto) {
        try {
            const hash = await argon.hash(dto.password);
            const activationToken = randomUUID();
            await this.prisma.user.create({
                data: { ...dto, activationToken, password: hash },
            });

            return { message: 'User created succesfully' };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
        }
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user.isActive) throw new ForbiddenException('User not activated');
        if (!user) throw new ForbiddenException('Credentials incorrect');
        const pwMatches = await argon.verify(user.password, dto.password);
        if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

        const { token, expiresIn, refreshToken } = await this.signToken(
            user.id,
            user.email,
            user.role
        );

        await this.prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

        delete user.password;
        delete user.activationToken;
        delete user.refreshToken;

        return { user: user, access_token: token, expiresIn, refreshToken };
    }

    async activate(token: string) {
        if (!token) throw new BadRequestException();
        const user = await this.prisma.user.findUnique({ where: { activationToken: token } });
        if (!user) throw new ForbiddenException('Invalid activation token');
        if (user.isActive) throw new ForbiddenException('User already activated');

        user.isActive = true;

        await this.prisma.user.update({
            where: { id: user.id },
            data: { isActive: true, activationToken: null },
        });

        return { message: 'User activated' };
    }

    async refresh(dto: RefreshTokenDto) {
        const user = await this.prisma.user.findUnique({
            where: { refreshToken: dto.refreshToken },
        });
        if (!user) throw new ForbiddenException('Invalid refresh token');

        try {
            await this.jwtService.verifyAsync(dto.refreshToken, {
                secret: envs.APP_SECRET,
            });
        } catch {
            throw new UnauthorizedException();
        }

        const { token, expiresIn, refreshToken } = await this.signToken(
            user.id,
            user.email,
            user.role
        );

        await this.prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

        return { access_token: token, expiresIn, refreshToken };
    }

    async signToken(userId: string, email: string, role: string) {
        const payload = { sub: userId, email, role };
        const expiresIn = '15m';
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: expiresIn,
        });
        const refreshToken = await this.jwtService.signAsync({ sub: userId }, { expiresIn: '30d' });

        return { token, expiresIn, refreshToken };
    }
}
