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

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { username: createUserDto.username }
    })

    if (userExists) throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST)
    try {
      const newUser = new User()
      newUser.username = createUserDto.username
      newUser.password = createUserDto.password
      newUser.isAdmin = createUserDto.isAdmin
      await this.userRepository.save(newUser)
      return ResultData.success('注册成功')
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { username: createUserDto.username }
    })
    if (userExists) throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST)
    try {
      const roleList = await this.roleRepository.find({
        where: {
          id: In(createUserDto.roleIds)
        }
      })
      const newUser = new User()
      newUser.password = createUserDto.password
      newUser.status = createUserDto.status
      newUser.nickname = createUserDto.nickname
      newUser.email = createUserDto.email
      newUser.telephone = createUserDto.telephone
      newUser.username = createUserDto.username
      newUser.roles = roleList
      await this.userRepository.save(newUser)
      return ResultData.success('创建成功')
    } catch (error) {
      throw new ApiException('创建失败', ApiErrorCode.FAIL)
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto
    const user = await this.findOne(username)
    if (user.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiErrorCode.PASSWORD_ERR)
    }
    const payload = { username: user.username, userId: user.id }
    const token = await this.jwtService.signAsync(payload)
    return ResultData.success('登录成功', token)
  }

  getCaptcha() {
    const { id, captcha } = generateCaptcha()
    return ResultData.success('', { id, img: captcha.data })
  }

  async getInfo(req) {
    //user.guard中注入的解析后的JWTtoken的user
    // const { user } = req
    const user = {
      userId: 1,
      username: 'admin'
    }
    const userInfo = await this.userRepository.findOne({
      where: { id: user.userId }
    })
    if (!userInfo) throw new ApiException('用户不存在', ApiErrorCode.USER_NOTEXIST)
    //根据关联关系通过user查询user下的菜单和角色
    const userList: User | null = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where({ id: user.userId })
      .getOne()

    const isAdmin = userInfo.isAdmin
    let permissions: string[] = []
    try {
      if (userList) {
        if (isAdmin) {
          permissions = ['*:*:*']
        } else {
          // 非超级管理员的话就查询所有权限
          const unFilterPermissions: string[] = []
          userList.roles.forEach((role) => {
            role.menus.forEach((menu) => {
              if (menu.permission) {
                unFilterPermissions.push(menu.permission)
              }
            })
          })
          permissions = [...new Set(unFilterPermissions)]
        }
      }

      await this.cacheService.set(`${user.userId}_permissions`, permissions, 7200)
      return ResultData.success('获取用户信息成功', {
        permissions: permissions,
        userInfo
      })
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL)
    }
  }
}
