import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StoreService {
  constructor(private readonly databaseService: DatabaseService) { }


  async create(createStoreDto: Prisma.StoreCreateInput) {
    return this.databaseService.store.create({ data: createStoreDto });
  }

  async findAll() {
    return this.databaseService.store.findMany(
      {
        include:{
          owner: true,
        }
      }
    );
  }

  async findOne(id: string) {
    return this.databaseService.store.findUnique({
      where: {
        id: id.toString()
      }
    });
  }

  async update(id: string, updateStoreDto: Prisma.StoreUpdateInput) {
    return this.databaseService.store.update({
      where: {
        id: id.toString()
      },
      data: updateStoreDto
    });
  }

  async remove(id: string) {
    return this.databaseService.store.delete({
      where: {
        id: id.toString()
      }
    });
  }

}
