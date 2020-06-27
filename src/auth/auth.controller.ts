import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Request
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from '../users/dto/login-user.dto'
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { UsersService } from 'src/users/users.service'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({
        status: 200,
        description: 'The logged in user and the jwt token'
    })
    @ApiBody({ type: LoginUserDto })
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.usersService.findByLogin(loginUserDto)

        const payload: JwtPayload = {
            email: user.email
        }
        const token = await this.authService.signPayload(payload)
        return { user, token }
    }

    @Post('/register')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: 200,
        description: 'The created user'
    })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiBearerAuth()
    getProfile(@Request() req) {
        return this.usersService.sanitizeUser(req.user)
    }
}
