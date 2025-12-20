import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { MockService } from './mock.service'
import { Public } from '@decorator/public.decorator'

@ApiTags('Mock 接口')
@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Post('users/list')
  @Public()
  @ApiOperation({ summary: '获取用户列表（文档演示用虚拟数据）' })
  getUserList(@Body() data: any) {
    return this.mockService.getMockUserList(data)
  }
}
