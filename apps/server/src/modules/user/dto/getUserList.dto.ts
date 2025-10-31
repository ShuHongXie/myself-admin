import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, Min, MinLength } from 'class-validator'
export class GetUserListDto {
  @IsOptional()
  @ApiProperty({
    example: 'admin',
    description: '用户名'
  })
  username: string
  @IsOptional()
  @ApiProperty({
    example: 'admin',
    description: '用户昵称'
  })
  nickname: string
  @IsOptional()
  @ApiProperty({
    example: '13005322685',
    description: '手机号码'
  })
  telephone: string
  @IsOptional()
  @ApiProperty({
    example: true,
    description: '用户状态'
  })
  status: boolean
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
