import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './modules/cateogory/category.module';

@Module({
    imports: [AuthModule, UserModule, PrismaModule, CategoryModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
