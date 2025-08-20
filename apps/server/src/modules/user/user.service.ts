import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ApiException } from 'src/common/filter/api.exception'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from './entities/user.entity'
import { In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiErrorCode } from '@enums/responseCode.enum'
import { ResultData } from '@utils/ResultData'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import encry from '@utils/crypto'
import generateCaptcha from '@utils/generateCaptcha'
import { Role } from '@modules/role/entities/role.entity'
import { filterPermissions } from '@utils/common'
import { Menu } from '@modules/menu/entities/menu.entity'
import { MenuService } from '@modules/menu/menu.service'
import { CacheService } from '@modules/cache/cache.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly menuService: MenuService,
    private readonly cacheService: CacheService
  ) {}

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }
    })

    if (!user) throw new ApiException('用户名不存在', ApiErrorCode.USER_NOTEXIST)
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<ResultData> {
    const userExists = await this.userRepository.findOne({
      where: { username: createUserDto.username }
    })

    if (userExists) throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST)
    try {
      const newUser = new User()
      if (createUserDto.roleIds?.length) {
        //查询需要绑定的角色列表(自动在关联表生成关联关系)
        const roleList = await this.roleRepository.find({
          where: {
            id: In(createUserDto.roleIds)
          }
        })
        newUser.roles = roleList
      }

      newUser.username = createUserDto.username
      newUser.password = createUserDto.password
      await this.userRepository.save(newUser)
      return ResultData.success('注册成功')
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto
    const user = await this.findOne(username)
    if (user.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiErrorCode.PASSWORD_ERR)
    }
    const payload = { username: user.username, sub: user.id }
    const token = await this.jwtService.signAsync(payload)
    return ResultData.success('登录成功', token)
  }

  getCaptcha() {
    const { id, captcha } = generateCaptcha()
    return ResultData.success('', { id, img: captcha.data })
  }

  async getInfo(req) {
    //user.guard中注入的解析后的JWTtoken的user
    const { user } = req
    //根据关联关系通过user查询user下的菜单和角色
    const userList: User | null = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where({ id: user.id })
      .orderBy('menu.order_num', 'ASC')
      .getOne()

    //是否为超级管理员,是的话查询所有菜单和权限
    const isAdmin = userList?.roles?.find((item) => item.roleName === 'admin')
    let routers: Menu[] = []
    let permissions: string[] = []
    if (isAdmin) {
      routers = (await this.menuService.findAll()).data
      //获取菜单所拥有的权限
      permissions = filterPermissions(routers)
      //存储当前用户的权限
      await this.cacheService.set(`${user.sub}_permissions`, permissions)
      return {
        // routers: convertToTree(routers),
        permissions: permissions
      }
    }
    // interface MenuMap {
    //   [key: string]: Menu
    // }
    // console.log(userList.roles[0].menus);

    //根据id去重
    // const menus: MenuMap = userList?.roles.reduce((mergedMenus: MenuMap, role: Role) => {
    //   role.menus.forEach((menu: Menu) => {
    //     mergedMenus[menu.id] = menu
    //   })
    //   return mergedMenus
    // }, {})

    // routers = Object.values(menus)
    permissions = filterPermissions(routers)
    await this.cacheService.set(`${user.sub}_permissions`, permissions, 7200)

    return {
      // routers: convertToTree(routers),
      permissions
    }
  }
}
