import { Injectable } from '@nestjs/common'
import { User } from './interfaces/user.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface'
import { LoginUserDto } from './dto/login-user.dto'
import { HttpException, HttpStatus } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto) {
        let createdUser = new this.userModel(createUserDto)
        return await createdUser.save()
    }

    async findByPayload(payload: JwtPayload) {
        const { email } = payload
        return await this.userModel.findOne({ email })
    }

    async findByLogin(userDTO: LoginUserDto) {
        const { email, password } = userDTO
        const user = await this.userModel
            .findOne({ email })
        if (!user) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.UNAUTHORIZED
            )
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user)
        } else {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.UNAUTHORIZED
            )
        }
    }

    sanitizeUser(user: User) {
        let { firstname, lastname, email } = user

        return {
            firstname, lastname, email
        }
    }
}
