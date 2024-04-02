import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StoreModule } from './store/store.module';
import { CartsModule } from './carts/carts.module';
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ProductsModule, StoreModule, CartsModule, BannerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
