import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, Min, IsOptional } from 'class-validator'

export class UpdateItemDto {
    @ApiProperty({ example: 'Apple', description: 'The name of the item' })
    @IsOptional()
    readonly name: string

    @ApiProperty({
        example: 'A fruit',
        description: 'The description of the item'
    })
    @IsOptional()
    readonly description: string

    @ApiProperty({ example: 5, description: 'The number of items' })
    @IsNumber()
    @Min(0)
    @IsOptional()
    readonly qty: number
}
