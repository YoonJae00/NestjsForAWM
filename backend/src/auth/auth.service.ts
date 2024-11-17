import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async transformPassword(user : CreateUserDto): Promise<void> {
        user.userPassword = await bcrypt.hash(
            user.userPassword, 10,
        );
        return Promise.resolve();
    }

    async register(createUserDto: CreateUserDto) {
        const existingUser = await this.userRepository.findByUserId(createUserDto.userId);
        if (existingUser) {
            throw new ConflictException('이미 존재하는 아이디입니다.');
        }

        await this.transformPassword(createUserDto);

        const user = this.userRepository.create(createUserDto);

        await this.userRepository.save(user);
        
        const { userPassword, ...result } = user;

        return result;
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findByUserId(loginDto.userId);
        // 1. 먼저 유저 존재 여부 체크
        if (!user) {
            throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
        }

        // 2. 비밀번호 검증
        const validatePassword = await bcrypt.compare(
            loginDto.userPassword, 
            user.userPassword
        );
        
        // 3. 비밀번호 검증 실패 시 예외 발생
        if (!validatePassword) {
            throw new UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
        }

        // 4. 비밀번호 검증 성공 시 유저 정보 반환
        const { userPassword, ...result } = user;
        return result;
    }

}
