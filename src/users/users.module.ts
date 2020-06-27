import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserSchema } from './schemas/user.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    providers: [UsersService],
    exports: [UsersService],
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
})
export class UsersModule {}
