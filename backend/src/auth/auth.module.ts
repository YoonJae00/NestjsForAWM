import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PassportJwtStrategy } from './security/passport.jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthorityRepository } from './repository/user-authority.repository';
import { UserAuthority } from './entity/user-authority.entity';

@Module({
    imports: [UserModule, 
      JwtModule.register({
        secret: "TestSecretKey",
        signOptions: { expiresIn: '300s' },
      }),
      PassportModule,
      TypeOrmModule.forFeature([UserAuthority])
    ],
    controllers: [AuthController],
    providers: [AuthService, PassportJwtStrategy, UserAuthorityRepository],
    exports: [UserAuthorityRepository]
})
export class AuthModule {}
