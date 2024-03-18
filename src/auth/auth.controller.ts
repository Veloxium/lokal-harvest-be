import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: Prisma.UserCreateInput) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: AuthDto){
    return this.authService.login(loginDto);
  }
}
