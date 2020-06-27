import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'

import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        })
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload)
        if (!user) {
            return done(
                new HttpException(
                    'Unauthorized access',
                    HttpStatus.UNAUTHORIZED
                ),
                false
            )
        }

        return done(null, user, payload.iat)
    }
}
