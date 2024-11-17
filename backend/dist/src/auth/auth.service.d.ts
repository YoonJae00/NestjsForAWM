import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: UserRepository);
    transformPassword(user: CreateUserDto): Promise<void>;
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        userId: string;
        userName: string;
        userEmail: string;
        userPhone: string;
        userAddress: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        id: number;
        userId: string;
        userName: string;
        userEmail: string;
        userPhone: string;
        userAddress: string;
    }>;
}
