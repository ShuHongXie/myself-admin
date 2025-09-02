import { ApiProperty } from '@nestjs/swagger'
import { IsEmpty, IsNotEmpty, IsOptional, MinLength } from 'class-validator'
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
    example: 'xiesmallxie',
    description: '用户昵称'
  })
  telephone: string
  @IsOptional()
  @ApiProperty({
    example: '13005322685',
    description: '手机号码'
  })
  password: string
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: '页码'
  })
  currentPage: number
  @IsOptional()
  @ApiProperty({
    example: 10,
    description: '页面大小'
  })
  pageSize: number
}
