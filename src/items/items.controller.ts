import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Query,
    Headers,
    Param
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

import { AuthService } from 'src/auth/auth.service'
import { UsersService } from 'src/users/users.service'
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface'
import { User } from 'src/users/interfaces/user.interface'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@ApiTags('Items')
@Controller('items')
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService,
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all items' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: [ItemDto]
    })
    @ApiOperation({ summary: 'Get all Items' })
    @ApiQuery({ name: 'limit', required: false })
    async findAll(@Query('limit') limit: number = 10): Promise<Item[]> {
        return await this.itemsService.findAll(Number(limit))
    }

    @Get('me')
    @ApiOperation({ summary: 'Get all items' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: [ItemDto]
    })
    @ApiOperation({ summary: 'Get all items of the user' })
    @ApiQuery({ name: 'limit', required: false })
    async listMine(@Headers() headers, @Query('limit') limit: number = 10): Promise<any> {
        let decoded: JwtPayload = this.authService.decodeToken(
            headers.authorization
        )
        let user: User = await this.usersService.findByPayload(decoded)

        return await this.itemsService.findByOwner(user._id, limit);

    }

    @Get(':id')
    @ApiOperation({ summary: 'Get item by id' })
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ItemDto
    })
    @ApiQuery({ name: 'id' })
    async findOne(@Param('id') id: any): Promise<any> {
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
    async create(
        @Headers() headers,
        @Body() createItemDto: ItemDto
    ): Promise<any> {
        let user: User;
        if (headers.authorization) {
            let decoded: JwtPayload = this.authService.decodeToken(
                headers.authorization
            )
            user = await this.usersService.findByPayload(decoded)
        }
        return await this.itemsService.create(createItemDto, user)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete item by id' })
    @ApiResponse({
        status: 200,
        description: 'The deleted record',
        type: ItemDto
    })
    @ApiQuery({ name: 'id' })
    async delete(@Param('id') id: string): Promise<Item> {
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