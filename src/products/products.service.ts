import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createProductDto: Prisma.ProductCreateInput) {
    return await this.databaseService.product.create({ data: createProductDto });
  }

  async findAll() {
    const products = await this.databaseService.product.findMany(
      {
        include: {
          store: {
            select: {
              name: true,
            }
          }
        }
      }
    );

    const count = await this.databaseService.product.count();

    return {
      count,
      products
    }
  }

  async findOne(id: string) {
    return this.databaseService.product.findUnique({
      where: {
        id: id.toString()
      },
      include: {
        store: true,

      }
    }
    );
  }

  async update(id: string, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: {
        id: id.toString()
      },
      data: updateProductDto
    });
  }

  async remove(id: string) {
    return this.databaseService.product.delete({
      where: {
        id: id.toString()
      }
    });
  }
}
