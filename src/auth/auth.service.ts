import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { sign, verify } from 'jsonwebtoken'

import { JwtPayload } from './interfaces/jwt-payload.interface'

import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signPayload(payload: JwtPayload) {
        return sign(payload, process.env.SECRET, { expiresIn: '12h' })
    }

    async validateUser(payload: JwtPayload) {
        return await this.usersService.findByPayload(payload)
    }

    decodeToken(token: string): JwtPayload {
        return <JwtPayload>verify(token.split(' ')[1], process.env.SECRET)
    }
}
