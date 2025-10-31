import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Req,
  UseGuards,
  Query,
  Put,
  ParseIntPipe,
  Param,
  Delete
} from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { ApiOperation, ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger'

import { UserService } from './user.service'

import { LoginDto } from './dto/login.dto'
import { Public } from '@decorator/public.decorator'
import { GetUserListDto } from './dto/getUserList.dto'
import { UpdateUserPasswordDto } from './dto/updateUserPassword.dto'

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: '账号注册' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto)
  }

  @Put('/updatePassword')
  @ApiOperation({ summary: '修改密码' })
  async updatePassword(
    @Req() req: Request & { user: any },
    @Body() updateUserDto: UpdateUserPasswordDto
  ) {
    return await this.userService.updatePassword(req, updateUserDto)
  }

  @Post('login')
  @Public()
  @ApiResponse({
    description: '返回示例',
    schema: {
      nullable: true // 允许响应为null
    },
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

  @Public()
  @Get('getInfo')
  @ApiOperation({ summary: '获取用户信息' })
  async getInfo(@Request() req) {
    return await this.userService.getInfo(req)
  }

  @Public()
  @Post()
  @ApiOperation({ summary: '新增用户' })
  createUserByAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Public()
  @Put()
  @ApiOperation({ summary: '更新用户' })
  updateUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.update(createUserDto)
  }

  @Public()
  @Delete(':userId')
  @ApiOperation({ summary: '删除用户' })
  deleteUser(@Param('userId', new ParseIntPipe()) userId: number) {
    return this.userService.delete(userId)
  }

  @Public()
  @Post('list')
  @ApiOperation({ summary: '获取用户列表' })
  list(@Body() getUserListDto: GetUserListDto) {
    return this.userService.getUserList(getUserListDto)
  }
}
