import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filter/httpException.filter'
import { TransformInterceptor } from './common/interceptor/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 获取配置服务
  const configService = app.get(ConfigService)
  // 从环境变量获取端口，默认使用 3000
  const port = configService.get<number>('PORT', 3000)
  // 注册全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter())
  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(port)
  console.log(`应用运行在: http://localhost:${port}`)
}
bootstrap()
