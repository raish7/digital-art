import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) { }

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
        // const tokenPayload = { username: user.username, id : user.id, roles: user.roles };
        return user;
    }
}
