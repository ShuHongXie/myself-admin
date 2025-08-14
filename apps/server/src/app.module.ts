import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    // 加载环境变量配置
    ConfigModule.forRoot({
      isGlobal: true, // 使配置模块全局可用
      envFilePath: '.env' // 指定环境变量文件路径
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
