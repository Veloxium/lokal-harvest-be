import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      const hash = await argon2.hash(createUserDto.password);
      createUserDto.password = hash;
      return this.databaseService.user.create({ data: createUserDto });
    } catch (error) {
      throw new Error('Error while hashing the password');
    }
  }

  async findAll(role?: 'USER' | 'SELLER' | 'ADMIN') {
    if (role) return this.databaseService.user.findMany({ where: { role, } });
    return this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.user.findUnique({ where: { id: id.toString() } });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    try {
      const password = updateUserDto.password as string;
      const hash = await argon2.hash(password);
      updateUserDto.password = hash;
      return this.databaseService.user.update({ where: { id: id.toString() }, data: updateUserDto });
    }
    catch (error) {
      throw new Error('Error while hashing the password');
    }
  }

  async remove(id: string) {
    return this.databaseService.user.delete({ where: { id: id.toString() } });
  }

}
