import { Injectable } from '@nestjs/common'
import { Item } from './interfaces/item.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

    findAll(limit: number = 5): Promise<Item[]> {
        return this.itemModel
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
    }

    findOne(id: string): Promise<Item> {
        return this.itemModel.findOne({ _id: id })
    }

    create(item: Item): Promise<Item> {
        const newItem = new this.itemModel(item)
        return newItem.save()
    }

    delete(id: string): Promise<Item> {
        return this.itemModel.findByIdAndRemove(id)
    }

    update(id: string, item: Item): Promise<Item> {
        return this.itemModel.findByIdAndUpdate(id, item, { new: true })
    }
}
