import { Injectable } from '@nestjs/common'
import { Item } from './interfaces/item.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/users/interfaces/user.interface'
import { ItemDto } from './dto/item.dto'
import { UpdateItemDto } from './dto/update-item.dto'

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) { }

    findAll(limit: number = 5): Promise<Item[]> {
        return this.itemModel
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
    }

    findOne(id: string): Promise<Item> {
        return this.itemModel.findOne({ _id: id })
    }

    async findByOwner(userId: string, limit: number): Promise<Item[]> {
        return await this.itemModel
            .find({ owner: userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .select('name description qty owner')
            .populate('owner')
    }

    async create(itemDto: ItemDto, user?: User): Promise<Item> {
        const item = await this.itemModel.create({
            ...itemDto,
            owner: user
        })
        await item.save()
        return item.populate('owner')
    }

    delete(id: string): Promise<Item> {
        return this.itemModel.findByIdAndRemove(id)
    }

    update(id: string, item: UpdateItemDto): Promise<Item> {
        return this.itemModel.findByIdAndUpdate(id, item, { new: true })
    }
}
