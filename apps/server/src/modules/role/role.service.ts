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

  async getRolesByPage(getRoleListDto: GetRoleListDto) {
    console.log(getRoleListDto)

    const queryBuilder = this.roleRepository
      .createQueryBuilder('role')
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
}
