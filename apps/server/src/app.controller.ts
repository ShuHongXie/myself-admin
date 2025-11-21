import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from '@decorator/public.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    // throw new ApiException('Forbidden', ApiErrorCode.USER_ID_INVALID)
    return this.appService.getHello()
  }
}
