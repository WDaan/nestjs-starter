import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty, IsString } from 'class-validator'

export class ItemDto {
    @ApiProperty({ example: 'Apple', description: 'The name of the item' })
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @ApiProperty({
        example: 'A fruit',
        description: 'The description of the item'
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string

    @ApiProperty({ example: 5, description: 'The number of items' })
    @IsNumber()
    readonly qty: number
}
