import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  findbyId(@Query('userId') id: string) {
    return this.cartsService.findbyId(id);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() { quantity }: { quantity: number }) {
    quantity = Number(quantity);
    return this.cartsService.update(id, quantity);
  }

}
