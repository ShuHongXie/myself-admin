import { Injectable } from '@nestjs/common'
import { CreateBaseDto, CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { QueryMenuDto } from './dto/query-menu.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@modules/user/entities/user.entity'
import { DeepPartial, Repository } from 'typeorm'
import { Menu } from './entities/menu.entity'
import { ApiException } from 'src/common/filter/api.exception'
import { ResultData } from '@utils/ResultData'
import { MenuMeta } from './entities/menu-meta.entity'
import { MenuType } from '@enums/common.enum'
import { ApiErrorCode } from '@enums/responseCode.enum'
import { paginateTransform } from '@utils/paginate'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>
  ) {}

  /**
   * @description 创建菜单
   * @author xieshuhong
   * @param {CreateMenuDto} createMenuDto
   * @return {*}  {Promise<Menu>}
   * @memberof MenuService
   */
  async createMenu(createMenuDto: CreateMenuDto | CreateBaseDto) {
    // 1. 转换 DTO 为实体对象
    const menu = this.menuRepository.create({
      ...createMenuDto,
      parentId: createMenuDto.parentId === -1 ? null : createMenuDto.parentId // 父ID默认为0（根菜单）
    } as DeepPartial<Menu>)
    console.log('menu：', menu)
    let dto
    if (menu.menuType !== MenuType.Button) {
      dto = createMenuDto as CreateMenuDto
      // 2. 手动关联元数据（TypeORM 级联会自动处理保存）
      menu.meta = new MenuMeta()
      Object.assign(menu.meta, dto.meta)

      // 3. 处理子菜单（递归创建）
      if (dto.children && dto.children.length > 0) {
        menu.children = await Promise.all(
          dto.children.map((childDto: Menu) =>
            this.createMenu({
              ...childDto,
              parentId: menu.id, // 子菜单的父ID设为当前菜单ID（创建后自动关联）
              createBy: createMenuDto.createBy || 1 // 继承创建人
            })
          )
        )
      }
    }

    // 4. 保存菜单（级联自动保存 meta 和 children）
    await this.menuRepository.save(menu)
    return ResultData.success('菜单创建成功')
  }

  /**
   * @description 获取所有菜单（不含按钮）
   * @author xieshuhong
   * @return {*}
   * @memberof MenuService
   */
  async findAll() {
    const queryBuilder = this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.meta', 'meta') // 关联元数据
      .leftJoinAndSelect('menu.children', 'children') // 关联子菜单
      .orderBy('menu.parent_id', 'ASC') // 先按父ID排序
      .addOrderBy('meta.order_num', 'ASC') // 再按元数据的排序号排序
      .andWhere('menu.menuType != :menuType', { menuType: MenuType.Button })

    const allMenus = await queryBuilder.getMany()
    return ResultData.success('获取成功', this.buildMenuTree(allMenus))
  }

  /**
   * @description 获取所有菜单（包含按钮）
   * @author xieshuhong
   * @return {*}
   * @memberof MenuService
   */
  async findAllWithButtons() {
    const queryBuilder = this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.meta', 'meta') // 关联元数据
      .leftJoinAndSelect('menu.children', 'children') // 关联子菜单
      .orderBy('menu.parent_id', 'ASC') // 先按父ID排序
      .addOrderBy('meta.order_num', 'ASC') // 再按元数据的排序号排序

    const allMenus = await queryBuilder.getMany()
    return ResultData.success('获取成功', this.buildMenuTree(allMenus))
  }

  /**
   * 递归构建菜单树形结构
   * @param menus 所有菜单数组
   * @param parentId 父菜单ID（默认顶级菜单为 null）
   */
  private buildMenuTree(menus: Menu[], parentId: number | null = null): Menu[] {
    return menus
      .filter((menu) => menu.parentId === parentId) // 筛选当前父级的子菜单
      .map((menu) => ({
        ...menu,
        // 递归处理子菜单
        children: this.buildMenuTree(menus, menu.id)
      }))
  }

  // async getInfo(req): Promise<Menu[]> {
  //   //user.guard中注入的解析后的JWTtoken的user
  //   const { user } = req
  //   //根据关联关系通过user查询user下的菜单和角色
  //   const userList: User = await this.userRepository
  //     .createQueryBuilder('fs_user')
  //     .leftJoinAndSelect('fs_user.roles', 'fs_role')
  //     .leftJoinAndSelect('fs_role.menus', 'fs_menu')
  //     .where({ id: user.userId })
  //     .orderBy('fs_menu.order_num', 'ASC')
  //     .getOne()

  //   //是否为超级管理员,是的话查询所有菜单
  //   const isAdmin = userList.roles?.find((item) => item.role_name === 'admin')
  //   let routers: Menu[] = []

  //   if (isAdmin) {
  //     routers = await this.menuRepository.find({
  //       order: {
  //         order_num: 'ASC'
  //       },
  //       where: {
  //         status: 1
  //       }
  //     })
  //     return convertToTree(routers)
  //   }
  //   interface MenuMap {
  //     [key: string]: Menu
  //   }
  //   // console.log(userList.roles[0].menus);

  //   //根据id去重
  //   const menus: MenuMap = userList?.roles.reduce((mergedMenus: MenuMap, role: Role) => {
  //     role.menus.forEach((menu: Menu) => {
  //       mergedMenus[menu.id] = menu
  //     })
  //     return mergedMenus
  //   }, {})

  //   routers = Object.values(menus)

  //   return convertToTree(routers)
  // }

  /**
   * @description 根据ID获取菜单详情
   * @param {number} id 菜单ID
   * @return {Promise<Menu>} 菜单详情
   */
  async findOne(id: number): Promise<ResultData<Menu>> {
    const menu = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.meta', 'meta')
      .leftJoinAndSelect('menu.children', 'children')
      .leftJoinAndSelect('children.meta', 'childrenMeta')
      .where('menu.id = :id', { id })
      .getOne()

    if (!menu) {
      throw new ApiException('菜单不存在', ApiErrorCode.COMMON_CODE)
    }
    return ResultData.success('获取成功', menu)
  }

  /**
   * @description 分页查询菜单列表
   * @param {QueryMenuDto} queryMenuDto 查询条件
   * @return {Promise<{ list: Menu[], total: number }>} 分页结果
   */
  async findByPage(queryMenuDto: QueryMenuDto) {
    const { name, menuType, status, parentId } = queryMenuDto
    try {
      const queryBuilder = this.menuRepository
        .createQueryBuilder('menu')
        .leftJoinAndSelect('menu.meta', 'meta')
        .leftJoinAndSelect('menu.parent', 'parent')

      // 添加筛选条件
      if (name) {
        queryBuilder.andWhere('menu.name LIKE :name', { name: `%${name}%` })
      }

      if (menuType !== undefined) {
        queryBuilder.andWhere('menu.menuType = :menuType', { menuType })
      }

      if (status !== undefined) {
        queryBuilder.andWhere('menu.status = :status', { status })
      }

      if (parentId !== undefined) {
        queryBuilder.andWhere('menu.parentId = :parentId', { parentId })
      }

      // 添加排序 - 简化排序逻辑
      queryBuilder.orderBy('menu.parentId', 'ASC').addOrderBy('menu.id', 'ASC')

      const paginationOptions: IPaginationOptions = {
        page: queryMenuDto.currentPage,
        limit: queryMenuDto.pageSize
      }
      const result = await paginateTransform<Menu>(queryBuilder, paginationOptions)

      return ResultData.success('查询成功', result)
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  /**
   * @description 更新菜单
   * @param {number} id 菜单ID
   * @param {UpdateMenuDto} updateMenuDto 更新数据
   * @return {Promise<Menu>} 更新后的菜单
   */
  async update(id: number, updateMenuDto: UpdateMenuDto) {
    try {
      console.log('----更新菜单----')

      const { data: existingMenu } = await this.findOne(id)
      // 更新基础菜单信息
      const { meta, children, ...menuData } = updateMenuDto
      Object.assign(existingMenu, menuData)

      // 更新元数据
      if (meta && existingMenu.meta) {
        Object.assign(existingMenu.meta, meta)
      } else if (meta && !existingMenu.meta && existingMenu.menuType !== MenuType.Button) {
        // 如果原来没有meta但现在需要meta（且不是按钮类型）
        existingMenu.meta = new MenuMeta()
        Object.assign(existingMenu.meta, meta)
      }
      const updatedMenu = await this.menuRepository.save(existingMenu)
      return ResultData.success('菜单更新成功', updatedMenu)
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  /**
   * @description 删除菜单
   * @param {number} id 菜单ID
   * @return {Promise<void>}
   */
  async remove(id: number) {
    try {
      const { data: menu } = await this.findOne(id)
      // 检查是否有子菜单
      const childrenCount = await this.menuRepository.count({
        where: { parentId: id }
      })
      if (childrenCount > 0) {
        throw new ApiException('该菜单下存在子菜单，请先删除子菜单', ApiErrorCode.COMMON_CODE)
      }

      await this.menuRepository.remove(menu)

      return ResultData.success('删除成功')
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  /**
   * @description 批量删除菜单（级联删除子菜单）
   * @param {number} id 菜单ID
   * @return {Promise<void>}
   */
  async removeWithChildren(id: number): Promise<void> {
    const menu = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.children', 'children')
      .where('menu.id = :id', { id })
      .getOne()

    if (!menu) {
      throw new ApiException('菜单不存在', ApiErrorCode.COMMON_CODE)
    }

    // TypeORM会根据cascade配置自动删除子菜单
    await this.menuRepository.remove(menu)
  }

  /**
   * @description 获取用户按钮权限列表
   * @param {number} userId 用户ID
   * @return {Promise<string[]>} 用户拥有的按钮权限列表
   */
  async getUserButtonPermissions(userId: number) {
    try {
      // 查询用户及其角色关联的所有菜单
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role')
        .leftJoinAndSelect('role.menus', 'menu')
        .where('user.id = :userId', { userId })
        .andWhere('user.status = :status', { status: true }) // 只查询启用的用户
        .andWhere('role.status = :roleStatus', { roleStatus: 1 }) // 只查询启用的角色
        .getOne()

      if (!user) {
        throw new ApiException('用户不存在或已被禁用', ApiErrorCode.COMMON_CODE)
      }

      // 检查是否为超级管理员
      const isAdmin = user.roles?.some((role) => role.roleName === 'admin' || user.isAdmin === 1)

      let buttonPermissions: string[] = []

      if (isAdmin) {
        // 超级管理员获取所有按钮权限
        const allButtons = await this.menuRepository
          .createQueryBuilder('menu')
          .where('menu.menuType = :menuType', { menuType: MenuType.Button })
          .andWhere('menu.status = :status', { status: true })
          .andWhere('menu.permission IS NOT NULL')
          .andWhere('menu.permission != :empty', { empty: '' })
          .getMany()

        buttonPermissions = allButtons
          .map((menu) => menu.permission)
          .filter((permission) => permission && permission.trim() !== '')
      } else {
        // 普通用户根据角色获取按钮权限
        const userMenus = new Map<number, Menu>()

        // 收集用户所有角色的菜单，去重
        user.roles?.forEach((role) => {
          role.menus?.forEach((menu) => {
            if (
              menu.menuType === MenuType.Button &&
              menu.status &&
              menu.permission &&
              menu.permission.trim() !== ''
            ) {
              userMenus.set(menu.id, menu)
            }
          })
        })

        buttonPermissions = Array.from(userMenus.values())
          .map((menu) => menu.permission)
          .filter((permission) => permission && permission.trim() !== '')
      }

      // 去重并排序
      const result = [...new Set(buttonPermissions)].sort()
      return ResultData.success('获取按钮权限成功', result)
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }
      throw new ApiException('获取按钮权限失败', ApiErrorCode.FAIL)
    }
  }
}
