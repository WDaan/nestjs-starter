import { Controller, Get } from '@nestjs/common'
import {
    ApiOperation,
    ApiResponse
} from '@nestjs/swagger'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

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
