import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
    
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findByUserId(userId: string): Promise<User | null> {
        return this.findOne({ where: { userId } });
    }
} 