import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards
} from '@nestjs/common'
import { ItemDto } from './dto/item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { ItemsService } from './items.service'
import { Item } from './interfaces/item.interface'
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
    ApiQuery
} from '@nestjs/swagger'
@ApiTags('Items')
@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all items' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: [ItemDto]
    })
    @ApiQuery({ name: 'limit' })
    @ApiOperation({ summary: 'Get all Items' })
    @ApiQuery({ name: 'limit', required: false })
    async findAll(@Query('limit') limit: number = 10): Promise<Item[]> {
        return await this.itemsService.findAll(limit)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get item by id' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ItemDto
    })
    @ApiQuery({ name: 'id' })
    async findOne(@Query('id') id: string): Promise<Item> {
        return await this.itemsService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a new item' })
    @ApiBody({ type: ItemDto })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ItemDto
    })
    async create(@Body() createItemDto: ItemDto): Promise<Item> {
        return await this.itemsService.create(createItemDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete item by id' })
    @ApiResponse({
        status: 200,
        description: 'The deleted record',
        type: ItemDto
    })
    @ApiQuery({ name: 'id' })
    async delete(@Query('id') id: string): Promise<Item> {
        return await this.itemsService.delete(id)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an item by id' })
    @ApiBody({ type: UpdateItemDto })
    @ApiQuery({ name: 'id' })
    @ApiResponse({
        status: 200,
        description: 'The updated record',
        type: ItemDto
    })
    async update(
        @Body() UpdateItemDto: UpdateItemDto,
        @Query('id') id: string
    ): Promise<Item> {
        return await this.itemsService.update(id, UpdateItemDto)
    }
}
