import { Test, TestingModule } from '@nestjs/testing'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'

describe('Items Controller', () => {
    let controller: ItemsController
    let service: ItemsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [
                {
                    provide: ItemsService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([
                            { name: 'Apple', desciption: 'a fruit', qty: 3 },
                            {
                                name: 'Pear',
                                desciption: 'another fruit',
                                age: 2
                            }
                        ])
                    }
                }
            ]
        }).compile()

        controller = module.get<ItemsController>(ItemsController)
        service = module.get<ItemsService>(ItemsService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('get all items', () => {
        it('should get an array of cats', () => {
            expect(controller.findAll()).resolves.toEqual([
                { name: 'Apple', desciption: 'a fruit', qty: 3 },
                { name: 'Pear', desciption: 'another fruit', age: 2 }
            ])
        })
    })
})
