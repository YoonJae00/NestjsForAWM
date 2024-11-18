import { UserRepository } from '../auth/repository/user.repository';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    findByUserId(userId: string): Promise<User>;
    findAll(): Promise<User[]>;
}
