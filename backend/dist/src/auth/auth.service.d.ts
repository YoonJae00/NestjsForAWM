import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    transformPassword(user: CreateUserDto): Promise<void>;
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        userId: string;
        userName: string;
        userEmail: string;
        userPhone: string;
        userAddress: string;
        authorities: any[];
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    } | undefined>;
    tokenValidateUser(payload: Payload): Promise<User>;
    private flattenAuthorities;
    private convertInAuthorities;
}
