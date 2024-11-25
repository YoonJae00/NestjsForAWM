import { DataSource, Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByUserId(userId: string): Promise<User | null>;
}
