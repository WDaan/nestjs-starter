import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'
import { ItemSchema } from './schemas/item.schema'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'

@Module({
    imports: [
        AuthModule,
        UsersModule,
        MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])
    ],
    controllers: [ItemsController],
    providers: [ItemsService]
})
export class ItemsModule {}
