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
    return this.databaseService.user.update({ where: { id: id.toString() }, data: updateUserDto });
  }

  async remove(id: string) {
    return this.databaseService.user.delete({ where: { id: id.toString() } });
  }

  async login(loginDto: { email: string, password: string }) {
    const user = await this.databaseService.user.findUnique({ where: { email: loginDto.email } });
    if (!user) throw new Error('User not found');
    if (await argon2.verify(user.password, loginDto.password)) return user;
    throw new Error('Invalid password');
  }

}
