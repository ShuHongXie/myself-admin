import { Injectable } from '@nestjs/common'
import { CreateBaseDto, CreateMenuDto } from './dto/create-menu.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@modules/user/entities/user.entity'
import { DeepPartial, Repository } from 'typeorm'
import { Menu } from './entities/menu.entity'
import { ApiException } from 'src/common/filter/api.exception'
import { ResultData } from '@utils/ResultData'
import { Role } from '@modules/role/entities/role.entity'
import { MenuMeta } from './entities/menu-meta.entity'
import { MenuType } from '@enums/common.enum'

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
    return this.menuRepository.save(menu)
  }

  /**
   * @description 获取所有菜单
   * @author xieshuhong
   * @return {*}
   * @memberof MenuService
   */
  async findAll() {
    // 1. 查询所有菜单，关联元数据和子菜单
    const allMenus = await this.menuRepository
      .createQueryBuilder('menu')
      .where('menu.menuType != :menuType', { menuType: MenuType.Button }) // 筛选不为按钮的菜单
      .leftJoinAndSelect('menu.meta', 'meta') // 关联元数据
      .leftJoinAndSelect('menu.children', 'children') // 关联子菜单
      .orderBy('menu.parent_id', 'ASC') // 先按父ID排序
      .addOrderBy('meta.order_num', 'ASC') // 再按元数据的排序号排序
      .getMany()

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
  //     .where({ id: user.sub })
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
}
