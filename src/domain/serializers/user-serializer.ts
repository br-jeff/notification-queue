import { Exclude, Expose } from 'class-transformer'
import { IsString, IsUUID } from 'class-validator'

@Exclude()
export class UserSerializer {
  @Expose()
  @IsUUID()
  id: string

  @Expose()
  @IsString()
  name: string

  @Expose()
  @IsString()
  username: string

  password: string
}
