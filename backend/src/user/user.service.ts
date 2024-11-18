import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../auth/repository/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async findByUserId(userId: string): Promise<User> {
        const user = await this.userRepository.findByUserId(userId);
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
}
