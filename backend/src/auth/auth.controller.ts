import { Controller, Post, Body, Req, Res, UseGuards, Get } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './security/auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async register(@Req() req: Request, @Body() createUserDto: CreateUserDto): Promise<any> {
        return await this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.login(loginDto);
        res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
        return res.json(jwt);
    }

    @Get('/authenticated')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request): any {
        const user: any = req.user;
        return user;
    }
}