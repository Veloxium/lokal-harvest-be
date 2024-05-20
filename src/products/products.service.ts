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
    return this.databaseService.product.findMany({
      include: {
        store: {
          select: {
            id: true,
            name: true,
            address: true,
            image: true,
          }
        }
      }
    });
  }

  async findOne(id: string) {
    return this.databaseService.product.findUnique({
      where: {
        id: id.toString()
      },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            address: true,
            image: true,
          }
        },
      }
    }
    );
  }

  async findByNameAndCat(search: string, cat: string) {
    if (search) {
      const products = await this.databaseService.product.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        include: {
          store: {
            select: {
              id: true,
              name: true,
              address: true,
              image: true,
            }
          }
        }
      });
      return products;
    } else if (cat) {
      const products = await this.databaseService.product.findMany({
        where: {
          category: cat
        },
        include: {
          store: {
            select: {
              id: true,
              name: true,
              address: true,
              image: true,
            }
          }
        }
      });
      return products;
    }
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
