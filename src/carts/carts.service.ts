import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class CartsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createCartDto: Prisma.CartCreateInput) {
    return await this.databaseService.cart.create({
      data: createCartDto,
    });
  }

  async findAll() {
    return await this.databaseService.cart.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.cart.findUnique({
      where: { id, },
    });
  }

  async update(id: string, updateCartDto: Prisma.CartUpdateInput) {
    return await this.databaseService.cart.update({
      where: { id, },
      data: updateCartDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.cart.delete({
      where: { id, },
    });
  }
}
