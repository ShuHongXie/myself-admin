import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

// 递归处理空字符串转null
function transformEmptyStringsToNull(value: any): any {
  // 如果是字符串且为空（或纯空格），转为null
  if (typeof value === 'string' && value.trim() === '') {
    return null
  }

  // 如果是数组，递归处理每个元素
  if (Array.isArray(value)) {
    return value.map((item) => transformEmptyStringsToNull(item))
  }

  // 如果是对象，递归处理每个属性
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, transformEmptyStringsToNull(val)])
    )
  }

  // 其他类型保持不变
  return value
}

@Injectable()
export class StringToNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取请求对象
    const request = context.switchToHttp().getRequest()

    // 处理请求体（body）
    if (request.body) {
      request.body = transformEmptyStringsToNull(request.body)
    }

    // 处理查询参数（query）
    // if (request.query) {
    //   request.query = transformEmptyStringsToNull(request.query)
    // }

    // 处理URL参数（params）
    if (request.params) {
      request.params = transformEmptyStringsToNull(request.params)
    }

    return next.handle()
  }
}
