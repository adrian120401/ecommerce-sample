import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { envs } from 'src/config/envs';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: envs.DATABASE_URL,
                },
            },
        });
    }
}
