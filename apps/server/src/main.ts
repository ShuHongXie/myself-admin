import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 获取配置服务
  const configService = app.get(ConfigService)

  // 从环境变量获取端口，默认使用 3000
  const port = configService.get<number>('PORT', 3000)

  await app.listen(port)
  console.log(`应用运行在: http://localhost:${port}`)
}
bootstrap()
