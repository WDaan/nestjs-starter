import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getVersion(): Object {
        return {
            info: 'NestJS API',
            version: process.env.npm_package_version
        }
    }
}
