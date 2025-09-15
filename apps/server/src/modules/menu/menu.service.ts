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
  async createMenu(createMenuDto: CreateMenuDto | CreateBaseDto): Promise<Menu> {
    // 1. 转换 DTO 为实体对象
    const menu = this.menuRepository.create(createMenuDto as DeepPartial<Menu>)
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
              createBy: createMenuDto.createBy // 继承创建人
            })
          )
        )
      }
    }

    // 4. 保存菜单（级联自动保存 meta 和 children）
    const savedMenu = await this.menuRepository.save(menu)
    return savedMenu
  }

  /**
   * @description 获取所有菜单
   * @author xieshuhong
   * @param {boolean} [includeButton=false] 是否包含按钮
   * @return {*}
   * @memberof MenuService
   */
  async findAll(includeButton: boolean = true) {
    const queryBuilder = this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.meta', 'meta') // 关联元数据
      .leftJoinAndSelect('menu.children', 'children') // 关联子菜单
      .orderBy('menu.parent_id', 'ASC') // 先按父ID排序
      .addOrderBy('meta.order_num', 'ASC') // 再按元数据的排序号排序

    if (!includeButton) {
      queryBuilder.where('menu.menuType != :menuType', { menuType: MenuType.Button })
    }

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
  async findOne(id: number): Promise<Menu> {
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

    return menu
  }

  /**
   * @description 分页查询菜单列表
   * @param {QueryMenuDto} queryMenuDto 查询条件
   * @return {Promise<{ list: Menu[], total: number }>} 分页结果
   */
  async findByPage(queryMenuDto: QueryMenuDto) {
    const { page = 1, pageSize = 10, name, menuType, status, parentId } = queryMenuDto

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

    // 分页
    const total = await queryBuilder.getCount()
    const list = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany()

    return ResultData.success('查询成功', {
      list,
      total,
      page,
      pageSize
    })
  }

  /**
   * @description 更新菜单
   * @param {number} id 菜单ID
   * @param {UpdateMenuDto} updateMenuDto 更新数据
   * @return {Promise<Menu>} 更新后的菜单
   */
  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const existingMenu = await this.findOne(id)

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

    // 注意：这里不处理children的更新，因为子菜单的更新应该通过各自的更新接口来处理
    // 如果需要批量更新子菜单，可以考虑单独的接口

    const updatedMenu = await this.menuRepository.save(existingMenu)
    return updatedMenu
  }

  /**
   * @description 删除菜单
   * @param {number} id 菜单ID
   * @return {Promise<void>}
   */
  async remove(id: number): Promise<void> {
    const menu = await this.findOne(id)

    // 检查是否有子菜单
    const childrenCount = await this.menuRepository.count({
      where: { parentId: id }
    })

    if (childrenCount > 0) {
      throw new ApiException('该菜单下存在子菜单，请先删除子菜单', ApiErrorCode.COMMON_CODE)
    }

    await this.menuRepository.remove(menu)
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
}
