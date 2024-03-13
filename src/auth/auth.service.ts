import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
    signup(): object {
        return { message: 'I am signed up' };
    }

    login(): object {
        return { message: 'I am login' };
    }
}
