import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    // 加载环境变量配置
    ConfigModule.forRoot({
      isGlobal: true, // 使配置模块全局可用
      envFilePath: '.env' // 指定环境变量文件路径
    }),
    // mysql链接
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // 端口号
      username: 'root', // 用户名
      password: '123456', // 密码
      database: 'admin', //数据库名
      entities: [], //数据库对应的Entity
      synchronize: true //是否自动同步实体文件,生产环境建议关闭
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
