import { Body, Controller, Get, Header, Post, Req, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { UserService } from './user.service'

import { LoginDto } from './dto/login.dto'
import { Public } from '@decorator/public.decorator'

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: '账号注册' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Post('login')
  @Public()
  @ApiOkResponse({
    description: '返回示例',
    type: LoginDto
  })
  @ApiOperation({ summary: '用户登录' })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto)
  }

  @Public()
  @Get('captcha')
  @ApiOperation({ summary: '获取验证码' })
  getCaptcha() {
    return this.userService.getCaptcha()
  }
}
