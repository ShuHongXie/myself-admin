import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MinLength, IsOptional } from 'class-validator'
export class LoginDto {
  @IsNotEmpty({
    message: '用户名不能为空'
  })
  @ApiProperty({
    example: 'admin',
    description: '用户名'
  })
  username: string

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
  @ApiProperty({
    example: 'abc123',
    description: '验证码ID',
    required: false
  })
  captchaId?: string

  @IsOptional()
  @ApiProperty({
    example: 'ABCD',
    description: '验证码',
    required: false
  })
  captcha?: string
}
