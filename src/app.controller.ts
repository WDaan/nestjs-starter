import { Controller, Body, Get, Request, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private authService: AuthService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get API version' })
    @ApiResponse({
        status: 200,
        description: 'The version of the API'
    })
    getVersion(): Object {
        return this.appService.getVersion()
    }
}
