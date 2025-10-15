import { ApiErrorCode } from '../enums/responseCode.enum'
export class ResultData<T = any> {
  constructor(code = ApiErrorCode.SUCCESS, msg?: string, data?: T) {
    this.code = code
    this.msg = msg || 'success'
    this.data = data || null
  }

  code: number
  msg?: string
  data?: any

  static success(msg?: string, data: any = ''): ResultData {
    return new ResultData(ApiErrorCode.SUCCESS, msg, data)
  }

  static fail(code, msg?: string, data: any = ''): ResultData {
    return new ResultData(code, msg || 'fail', data)
  }
}
