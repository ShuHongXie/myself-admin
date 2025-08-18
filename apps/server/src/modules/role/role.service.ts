import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiException } from 'src/common/filter/api.exception'
import { In, Repository } from 'typeorm'
import { User } from '@modules/user/entities/user.entity'
import { Menu } from '@modules/menu/entities/menu.entity'
import { Role } from './entities/role.entity'
import { ApiErrorCode } from '@enums/responseCode.enum'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<string> {
    const row = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name }
    })
    if (row) {
      throw new ApiException('角色已存在', ApiErrorCode.COMMON_CODE)
    }
    const newRole = new Role()
    if (createRoleDto.menu_ids?.length) {
      //查询包含menu_ids的菜单列表
      const menuList = await this.menuRepository.find({
        where: {
          id: In(createRoleDto.menu_ids)
        }
      })
      //赋值给newRole(插入表中之后就会在关系表中生成对应关系)
      newRole.menus = menuList
    }
    try {
      await this.roleRepository.save({ ...createRoleDto, ...newRole })
      return 'success'
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }
}
