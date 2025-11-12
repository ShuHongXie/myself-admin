import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filter/httpException.filter'
import { TransformInterceptor } from './common/interceptor/transform.interceptor'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
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
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 移除未在DTO中定义的属性
      // forbidNonWhitelisted: true, // 对未定义的属性抛出错误
      transform: true, // 自动转换请求数据类型
      transformOptions: {
        enableImplicitConversion: true // 允许隐式转换，包括null
        // strategy: 'excludeAll'
      },
      exceptionFactory: (errors) => {
        console.log(errors)

        // 自定义错误格式，提取详细信息
        // const result = errors.map((error) => ({
        //   property: error.property,
        //   constraints: error.constraints
        // }))
        // return new BadRequestException({
        //   message: '请求数据验证失败',
        //   details: result
        // })
      }
    })
  )
  // 启用CORS
  app.enableCors()
  // 集成swagger文档
  const config = new DocumentBuilder()
    .setTitle('Minilo后台管理系统')
    .setDescription('Minilo后台管理系统API文档')
    .build()
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  })
  // swagger网页访问地址：http://localhost:4000/swagger
  // swagger网页json访问地址：http://localhost:4000/swagger-json
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger-json'
  })

  await app.listen(port)
  console.log(`应用运行在: http://localhost:${port}`)
}
bootstrap()
