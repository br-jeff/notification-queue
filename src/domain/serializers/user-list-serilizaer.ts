

import { Expose, Type } from "class-transformer"
import { ArrayMinSize, IsNumber, ValidateNested } from "class-validator"
import { UserSerializer } from "./user-serializer"

export class ListUserSerialize {

    @Expose()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => UserSerializer)
    data: UserSerializer

    @Expose()
    @IsNumber()
    count: number
}


