import { Test, TestingModule } from '@nestjs/testing'
import { ItemsService } from './items.service'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Item } from './interfaces/item.interface'

describe('ItemsService', () => {
    let service: ItemsService
    let model: Model<Item>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ItemsService,
                {
                    provide: getModelToken('Item'),
                    useValue: {
                        find: jest.fn(),
                        exec: jest.fn(),
                        sort: jest.fn(),
                        limit: jest.fn()
                    }
                }
            ]
        }).compile()

        service = module.get<ItemsService>(ItemsService)
        model = module.get<Model<Item>>(getModelToken('Item'))
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
