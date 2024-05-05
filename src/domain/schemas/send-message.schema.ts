import { IsArray, IsString } from "class-validator"

export class SendMessageSchema {
    @IsString()
    content: string

    @IsArray()
    users: string[]
}
