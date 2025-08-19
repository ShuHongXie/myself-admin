import { Module } from '@nestjs/common'
import { MenuService } from './menu.service'
import { MenuController } from './menu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Menu } from './entities/menu.entity'
import { User } from '@modules/user/entities/user.entity'
import { MenuMeta } from './entities/menu-meta.entity'

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [TypeOrmModule.forFeature([User, Menu, MenuMeta])]
})
export class MenuModule {}
