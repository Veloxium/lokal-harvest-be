import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Prisma } from '@prisma/client';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post()
  create(@Body() createCartDto: { userId: string, productId: string, quantity: number }) {
    createCartDto.quantity = Number(createCartDto.quantity);
    return this.cartsService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findbyId(@Param('id') id: string) {
    return this.cartsService.findbyId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: Prisma.CartUpdateInput) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
