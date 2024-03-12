import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('signup')
    signup(/* @Body() body */) {
        this.authService.signup();
    }

    @Post('login')
    login(/* @Body() body */) {
        this.authService.login();    
    }

}
