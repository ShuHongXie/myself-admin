import { Body, Controller, Get, Header, Post, Req } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  @ApiOperation({ summary: '账号注册' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  // @Post('login')
  // @Header('Cache-Control', 'no-store')
  // login(@Body() loginDto: LoginDto) {
  //   return this.userService.login(loginDto)
  // }
}
