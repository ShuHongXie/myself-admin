import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filter/httpException.filter'
import { TransformInterceptor } from './common/interceptor/transform.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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
  // 全局校验管道管道
  app.useGlobalPipes(new ValidationPipe())
  // 启用CORS
  app.enableCors()
  // 集成swagger文档
  const config = new DocumentBuilder()
    .setTitle('MySelf后台管理系统')
    .setDescription('MySelf后台管理系统API文档')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  // swagger网页访问地址：http://localhost:4000/swagger
  // swagger网页json访问地址：http://localhost:4000/swagger-json
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger-json'
  })

  await app.listen(port)
  console.log(`应用运行在: http://localhost:${port}`)
}
bootstrap()
