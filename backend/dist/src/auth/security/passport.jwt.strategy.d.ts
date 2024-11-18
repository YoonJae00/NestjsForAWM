import { Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Payload } from './payload.interface';
declare const PassportJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class PassportJwtStrategy extends PassportJwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: Payload, done: VerifiedCallback): Promise<any>;
}
export {};
