import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) { }

    async create(createUserDto: Prisma.UserCreateInput) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.databaseService.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword
            }
        })
    }
    async login(payload: { username: string, password: string }) {
        const user = await this.databaseService.user.findUnique({
            where: {
                username: payload.username
            }
        })
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(payload.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const tokenPayload = { id : user.id, username: user.username,  roles: user.roles };
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            roles: user.roles,
            createdAt: user.createdAt,
            access_token: await this.jwtService.signAsync(tokenPayload)
        };
    }
}
