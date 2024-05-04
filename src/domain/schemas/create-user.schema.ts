import { IsString } from "class-validator"

export class CreateUserSchema {
    @IsString()
    name: string

    @IsString()
    password: string
}