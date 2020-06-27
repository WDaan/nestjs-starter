import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
    @ApiProperty({ example: 'john.doe@gmail.com', description: 'Your email' })
    @IsNotEmpty()
    @IsString()
    readonly email: string

    @ApiProperty({
        example: 'password',
        description: 'Your password'
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string
}
