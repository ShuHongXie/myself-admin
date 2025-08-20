import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Role } from '@modules/role/entities/role.entity'
import { MenuModule } from '@modules/menu/menu.module'
import { CacheModule } from '@modules/cache/cache.module'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Role]), MenuModule, CacheModule]
})
export class UserModule {}
