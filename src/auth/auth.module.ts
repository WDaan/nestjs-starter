import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'

import * as dotenv from 'dotenv'
dotenv.config()

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: '1800s' }
        })
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
