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
import { ResultData } from '@utils/ResultData'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { roleName: createRoleDto.roleName }
    })
    if (role) {
      throw new ApiException('角色已存在', ApiErrorCode.COMMON_CODE)
    }
    const newRole = new Role()
    newRole.roleName = createRoleDto.roleName
    newRole.status = createRoleDto.status
    // 增加菜单
    if (createRoleDto.menuIds?.length) {
      const menuList = await this.menuRepository.find({
        where: {
          id: In(createRoleDto.menuIds)
        }
      })
      newRole.menus = menuList
    }
    try {
      await this.roleRepository.save({ ...newRole, ...createRoleDto })
      return ResultData.success('创建成功')
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  async findAll() {
    try {
      const roleList = await this.roleRepository.find()
      return ResultData.success('', roleList)
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }
}
