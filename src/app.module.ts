import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './modules/cateogory/category.module';
import { SubCategoryModule } from './modules/subCategory/subCategory.module';
import { ProductModule } from './modules/product/product.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        PrismaModule,
        CategoryModule,
        SubCategoryModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
