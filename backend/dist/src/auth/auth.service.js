"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user/user.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async transformPassword(user) {
        user.userPassword = await bcrypt.hash(user.userPassword, 10);
        return Promise.resolve();
    }
    async register(createUserDto) {
        const existingUser = await this.userRepository.findByUserId(createUserDto.userId);
        if (existingUser) {
            throw new common_1.ConflictException('이미 존재하는 아이디입니다.');
        }
        await this.transformPassword(createUserDto);
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        const { userPassword, ...result } = user;
        return result;
    }
    async login(loginDto) {
        const user = await this.userRepository.findByUserId(loginDto.userId);
        if (!user) {
            throw new common_1.UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
        }
        const validatePassword = await bcrypt.compare(loginDto.userPassword, user.userPassword);
        if (!validatePassword) {
            throw new common_1.UnauthorizedException('아이디 또는 비밀번호가 잘못되었습니다.');
        }
        const { userPassword, ...result } = user;
        const payload = {
            userId: user.userId,
            userName: user.userName,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    async tokenValidateUser(payload) {
        return await this.userRepository.findByUserId(payload.userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map