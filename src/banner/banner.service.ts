import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class BannerService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createBannerDto: Prisma.BannerCreateInput) {
    return 'This action adds a new banner';
  }

  async findAll() {
    return await this.databaseService.banner.findMany();
  }

  async findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  async update(id: number, updateBannerDto: Prisma.BannerUpdateInput) {
    return `This action updates a #${id} banner`;
  }

  async remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
