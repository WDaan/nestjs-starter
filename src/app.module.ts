import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ItemsModule } from './items/items.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
    imports: [
        ItemsModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
