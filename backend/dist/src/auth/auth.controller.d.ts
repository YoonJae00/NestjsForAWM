import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(req: Request, createUserDto: CreateUserDto): Promise<any>;
    login(loginDto: LoginDto, res: Response): Promise<any>;
    isAuthenticated(req: Request): any;
}
