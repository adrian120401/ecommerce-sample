import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';
import { RefreshTokenDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signup')
    signup(@Body() dto: SignUpDto): object {
        return this.authService.signup(dto);
    }

    @Public()
    @Post('login')
    login(@Body() dto: LoginDto): object {
        return this.authService.login(dto);
    }

    @Public()
    @Post('activate')
    activate(@Query('token') token: string): object {
        return this.authService.activate(token);
    }

    @Public()
    @Post('refresh')
    refresh(@Body() dto: RefreshTokenDto): object {
        return this.authService.refresh(dto);
    }
}
