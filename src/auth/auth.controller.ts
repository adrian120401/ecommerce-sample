import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';

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
}
