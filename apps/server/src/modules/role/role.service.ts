import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { GetRoleListDto } from './dto/getRoleList.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { ApiException } from 'src/common/filter/api.exception'
import { In, Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm'
import { User } from '@modules/user/entities/user.entity'
import { Menu } from '@modules/menu/entities/menu.entity'
import { Role } from './entities/role.entity'
import { ApiErrorCode } from '@enums/responseCode.enum'
import { InjectRepository } from '@nestjs/typeorm'
import { ResultData } from '@utils/ResultData'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { paginateTransform } from '@utils/paginate'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      // 检查角色名是否已存在
      const existingRole = await this.roleRepository.findOne({
        where: { roleName: createRoleDto.roleName }
      })
      if (existingRole) {
        throw new ApiException('角色名已存在', ApiErrorCode.COMMON_CODE)
      }

      // 验证菜单ID是否有效
      if (createRoleDto.menuIds?.length) {
        for (const menuId of createRoleDto.menuIds) {
          if (!Number.isInteger(menuId) || menuId <= 0) {
            throw new ApiException('菜单ID必须为有效的正整数', ApiErrorCode.COMMON_CODE)
          }
        }
        const menuList = await this.menuRepository.find({
          where: {
            id: In(createRoleDto.menuIds)
          }
        })
        if (menuList.length !== createRoleDto.menuIds.length) {
          throw new ApiException('部分菜单不存在', ApiErrorCode.COMMON_CODE)
        }
      }

      const newRole = new Role()
      newRole.roleName = createRoleDto.roleName
      newRole.status = createRoleDto.status
      newRole.roleSort = createRoleDto.roleSort
      newRole.remark = createRoleDto.remark || ''
      newRole.createBy = createRoleDto.createBy || 1
      newRole.updateBy = createRoleDto.updateBy || 1

      // 关联菜单
      if (createRoleDto.menuIds?.length) {
        const menuList = await this.menuRepository.find({
          where: {
            id: In(createRoleDto.menuIds)
          }
        })
        newRole.menus = menuList
      }

      const savedRole = await this.roleRepository.save(newRole)
      return ResultData.success('创建成功', savedRole)
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      // 检查角色是否存在
      const role = await this.roleRepository.findOne({
        where: { id },
        relations: ['menus']
      })
      if (!role) {
        throw new ApiException('角色不存在', ApiErrorCode.COMMON_CODE)
      }

      // 检查角色名是否已存在（排除当前角色）
      if (updateRoleDto.roleName && updateRoleDto.roleName !== role.roleName) {
        const existingRole = await this.roleRepository.findOne({
          where: { roleName: updateRoleDto.roleName }
        })
        if (existingRole) {
          throw new ApiException('角色名已存在', ApiErrorCode.COMMON_CODE)
        }
      }

      // 验证菜单ID是否有效
      if (updateRoleDto.menuIds?.length) {
        for (const menuId of updateRoleDto.menuIds) {
          if (!Number.isInteger(menuId) || menuId <= 0) {
            throw new ApiException('菜单ID必须为有效的正整数', ApiErrorCode.COMMON_CODE)
          }
        }

        const menuList = await this.menuRepository.find({
          where: {
            id: In(updateRoleDto.menuIds)
          }
        })
        if (menuList.length !== updateRoleDto.menuIds.length) {
          throw new ApiException('部分菜单不存在', ApiErrorCode.COMMON_CODE)
        }
        role.menus = menuList
      }

      // 更新角色属性
      if (updateRoleDto.roleName !== undefined) {
        role.roleName = updateRoleDto.roleName
      }
      if (updateRoleDto.status !== undefined) {
        role.status = updateRoleDto.status
      }
      if (updateRoleDto.roleSort !== undefined) {
        role.roleSort = updateRoleDto.roleSort
      }
      if (updateRoleDto.remark !== undefined) {
        role.remark = updateRoleDto.remark
      }
      if (updateRoleDto.updateBy !== undefined) {
        role.updateBy = updateRoleDto.updateBy
      }

      const updatedRole = await this.roleRepository.save(role)
      return ResultData.success('更新成功', updatedRole)
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  async getRolesByPage(getRoleListDto: GetRoleListDto) {
    const queryBuilder = this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menu')
      .orderBy('role.createTime', 'DESC')

    try {
      // 角色名称筛选
      if (getRoleListDto?.roleName) {
        queryBuilder.andWhere('role.roleName LIKE :roleName', {
          roleName: `%${getRoleListDto.roleName}%`
        })
      }

      // 状态筛选
      if (getRoleListDto.status !== undefined) {
        queryBuilder.andWhere('role.status = :status', { status: getRoleListDto.status })
      }

      // 创建时间区间筛选
      if (getRoleListDto.startCreateDate || getRoleListDto.endCreateDate) {
        // 只有开始日期
        if (getRoleListDto.startCreateDate && !getRoleListDto.endCreateDate) {
          const start = new Date(getRoleListDto.startCreateDate)
          queryBuilder.andWhere('role.createTime >= :start', { start })
        }
        // 只有结束日期
        else if (!getRoleListDto.startCreateDate && getRoleListDto.endCreateDate) {
          const end = new Date(getRoleListDto.endCreateDate)
          queryBuilder.andWhere('role.createTime <= :end', { end })
        }
        // 两个日期都有
        else if (getRoleListDto.startCreateDate && getRoleListDto.endCreateDate) {
          const start = new Date(getRoleListDto.startCreateDate)
          const end = new Date(getRoleListDto.endCreateDate)

          // 使用 Between 进行区间查询
          queryBuilder.andWhere('role.createTime BETWEEN :start AND :end', { start, end })
        }
      }

      const paginationOptions: IPaginationOptions = {
        page: getRoleListDto.currentPage, // 映射 currentPage -> page
        limit: getRoleListDto.pageSize // 映射 pageSize -> limit
      }
      const result = await paginateTransform<Role>(queryBuilder, paginationOptions)
      result.result = result.result.map((role) => ({
        ...role,
        menuIds: role.menus.map((menu) => menu.id)
      }))
      return ResultData.success('获取角色列表成功', result)
    } catch (error) {
      console.log(error)

      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  async getAllRoles() {
    try {
      const roleList = await this.roleRepository.find({
        where: {
          status: 1
        }
      })
      return ResultData.success('', roleList)
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
        relations: ['menus']
      })
      if (!role) {
        throw new ApiException('角色不存在', ApiErrorCode.COMMON_CODE)
      }
      return ResultData.success('获取角色信息成功', role)
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  async remove(id: number) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
        relations: ['menus']
      })
      if (!role) {
        throw new ApiException('角色不存在', ApiErrorCode.COMMON_CODE)
      }

      // 检查是否有用户关联此角色
      const usersWithRole = await this.userRepository.find({
        relations: ['roles'],
        where: {
          roles: {
            id: id
          }
        }
      })

      if (usersWithRole.length > 0) {
        throw new ApiException('该角色下还有用户，无法删除', ApiErrorCode.COMMON_CODE)
      }

      await this.roleRepository.remove(role)
      return ResultData.success('删除成功')
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }
}
