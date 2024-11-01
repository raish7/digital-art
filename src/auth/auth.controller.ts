import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    create(@Body() createUserDto: Prisma.UserCreateInput) {
        return this.authService.create(createUserDto);
    }

    @Post('login')
    login(@Body() payload: { username: string, password: string }) {
        return this.authService.login(payload);
    }
}
