import { Expose, Transform } from "class-transformer"
import { IsNumber, Min } from "class-validator"

export class PaginationSchema {
    @Expose()
    @Transform(({ value }) => value ?? 0)
    @IsNumber()
    @Min(0)
    page: number
  
    @Expose()
    @Transform(({ value }) => value ?? 10)
    @Min(1)
    @IsNumber()
    size: number
  }