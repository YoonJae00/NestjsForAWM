import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    findAll() : string {
        return 'finds for users';
    }
    @Get(':userId')
    findOne(@Param('userId') userId : string) : string {
        return `finds for user ${userId}`;
    }
    @Get(':type/:a/:b')
    calc(@Param('type') type : string, @Param('a') a : number, @Param('b') b :number) : number {
        const realA : number = Number(a);
        const realB : number = Number(b);
        let result : number;
        if(type === 'plus') {
            result = realA + realB; 
        } else if(type === 'minus') {
            result = realA - realB;
        } else if(type === 'multi') {
            result = realA * realB;
        } else if(type === 'div') {
            result = realA / realB;
        }

        return result;
    }
}
