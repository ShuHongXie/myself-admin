import { IsOptional, IsInt, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class QueryMenuDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize?: number = 10

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  menuType?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  status?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  parentId?: number
}
