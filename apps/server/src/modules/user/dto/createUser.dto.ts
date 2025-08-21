//create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, MinLength, IsOptional } from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空'
  })
  @ApiProperty({
    description: '用户名'
  })
  username: string

  @IsOptional()
  @IsNotEmpty({
    message: '昵称不能为空'
  })
  @ApiProperty({
    description: '昵称'
  })
  nickname: string

  @IsOptional()
  @ApiProperty({
    description: '是否管理员'
  })
  isAdmin: number

  @IsOptional()
  @ApiProperty({
    example: '1',
    description: '状态',
    required: false
  })
  status: number

  @IsNotEmpty({
    message: '密码不能为空'
  })
  @MinLength(6, {
    message: '密码不能少于6位'
  })
  @ApiProperty({
    example: '123456',
    description: '密码'
  })
  password: string

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: '角色id集合'
  })
  roleIds: number[]
}
