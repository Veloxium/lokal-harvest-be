import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class CartsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createCartDto: { userId: string, productId: string, quantity: number }) {
    const checkCart = await this.databaseService.cart.findFirst({
      where: {
        userId: createCartDto.userId,
        productId: createCartDto.productId,
      }
    });

    if (checkCart) {
      return await this.databaseService.cart.update({
        where: { id: checkCart.id, },
        data: {
          quantity: checkCart.quantity + createCartDto.quantity,
        },
      });
    }
    return await this.databaseService.cart.create({ data: createCartDto });
  }

  async findAll() {
    return await this.databaseService.cart.findMany();
  }

  async findbyId(userId: string) {
    return await this.databaseService.cart.findMany({
      where: { userId, },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
            stock: true,
            category: true,
            store: {
              select: {
                name: true,
              }
            }
          }
        }
      }
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
