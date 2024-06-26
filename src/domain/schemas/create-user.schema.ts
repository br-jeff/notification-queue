import { IsString } from "class-validator"

export class CreateUserSchema {
    @IsString()
    name: string

    @IsString()
    username: string

    @IsString()
    password: string
}