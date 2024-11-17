import { IsNotEmpty, IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: '아이디를 입력해주세요.' })
    @IsString({ message: '아이디는 문자열이어야 합니다.' })
    userId: string;

    @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
    @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
    userPassword: string;

    @IsNotEmpty({ message: '이름을 입력해주세요.' })
    @IsString({ message: '이름은 문자열이어야 합니다.' })
    userName: string;

    @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
    userEmail: string;

    @IsOptional()
    @IsString({ message: '전화번호는 문자열이어야 합니다.' })
    @IsPhoneNumber('KR', { message: '올바른 전화번호 형식이 아닙니다.' })
    userPhone?: string;

    @IsOptional()
    @IsString({ message: '주소는 문자열이어야 합니다.' })
    userAddress?: string;
} 