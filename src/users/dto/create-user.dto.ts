import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'Your first name' })
    @IsNotEmpty()
    @IsString()
    readonly firstname: string

    @ApiProperty({ example: 'Doe', description: 'Your last name' })
    @IsNotEmpty()
    @IsString()
    readonly lastname: string

    @ApiProperty({ example: 'john.doe@gmail.com', description: 'Your email' })
    @IsNotEmpty()
    @IsString()
    readonly email: string

    @ApiProperty({ example: 'password', description: 'Your Password' })
    @IsNotEmpty()
    @IsString()
    readonly password: string
}
