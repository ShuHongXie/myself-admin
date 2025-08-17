import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@guard/auth.guard'
import { CacheModule } from './modules/cache/cache.module'
import { MenuModule } from './modules/menu/menu.module'

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
      entities: ['**/*.entity.js'], //数据库对应的Entity
      autoLoadEntities: true,
      synchronize: true //是否自动同步实体文件,生产环境建议关闭
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXP')
          }
        }
      }
    }),
    UserModule,
    CacheModule,
    MenuModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
