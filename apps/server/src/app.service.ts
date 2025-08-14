import { Injectable } from '@nestjs/common'
import { ResultData } from '@utils//ResultData'

@Injectable()
export class AppService {
  getHello() {
    return ResultData.success('Hello World!')
  }
}
