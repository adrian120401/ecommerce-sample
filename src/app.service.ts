import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHealthStatus(): object {
        return { message: 'Working fine' };
    }
}
