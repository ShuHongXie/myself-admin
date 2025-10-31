import { IsOptional, IsInt, IsString, IsNumber, Min, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class QueryMenuDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  menuType?: number

  @IsOptional()
  @IsBoolean()
  status?: boolean

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  parentId?: number

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 1,
    description: '页码'
  })
  currentPage: number
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 10,
    description: '页面大小'
  })
  pageSize: number
}
