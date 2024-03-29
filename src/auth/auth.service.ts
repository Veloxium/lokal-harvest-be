import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createAuthDto: Prisma.UserCreateInput) {
    try {
      const hash = await argon2.hash(createAuthDto.password);
      createAuthDto.password = hash;
      return this.databaseService.user.create({ data: createAuthDto });
    } catch (error) {
      throw new Error('Error while hashing the password');
    }
  }

  async login(loginDto: { email: string, password: string }) {
    const user = await this.databaseService.user.findUnique({ where: { email: loginDto.email } });
    if (!user) throw new Error('User not found');
    if (await argon2.verify(user.password, loginDto.password)){
      const { password, ...result } = user;
      return result;
    };
    throw new Error('Invalid password');
  }
}
