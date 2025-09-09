import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ApiException } from 'src/common/filter/api.exception'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from './entities/user.entity'
import { DataSource, In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiErrorCode } from '@enums/responseCode.enum'
import { ResultData } from '@utils/ResultData'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import encry from '@utils/crypto'
import generateCaptcha from '@utils/generateCaptcha'
import { Role } from '@modules/role/entities/role.entity'
import { filterPermissions, isValidNumber } from '@utils/common'
import { Menu } from '@modules/menu/entities/menu.entity'
import { MenuService } from '@modules/menu/menu.service'
import { CacheService } from '@modules/cache/cache.service'
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate'
import { GetUserListDto } from './dto/getUserList.dto'
import { paginateTransform } from '@utils/paginate'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly menuService: MenuService,
    private readonly cacheService: CacheService,
    private dataSource: DataSource
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

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const newUser = new User()
      newUser.password = createUserDto.password
      newUser.status = createUserDto.status
      newUser.nickname = createUserDto.nickname
      newUser.email = createUserDto.email
      newUser.telephone = createUserDto.telephone
      newUser.username = createUserDto.username
      const savedUser = await this.userRepository
        .createQueryBuilder('user')
        .insert() // 指定为插入操作
        .into(User) // 指定插入的实体
        .values(newUser)
        .execute() // 执行插入

      // 有角色就插入
      if (createUserDto.rolesId?.length) {
        const assignedRoles = await this.roleRepository
          .createQueryBuilder('role')
          .where('role.id IN (:...rolesId)', { rolesId: createUserDto.rolesId }) // 关键：用 :... 展开数组
          .getMany() // 获取多条记录

        await this.userRepository
          .createQueryBuilder('user')
          .relation(User, 'roles')
          .of(savedUser.generatedMaps[0].id)
          .add(assignedRoles)
      }

      // 所有操作成功，提交事务
      await queryRunner.commitTransaction()
      return ResultData.success('创建成功')
    } catch (error) {
      // 发生错误，回滚事务
      await queryRunner.rollbackTransaction()
      throw new ApiException('创建失败', ApiErrorCode.FAIL)
    } finally {
      // 无论成功失败，都释放查询执行器
      await queryRunner.release()
    }
  }

  async update(createUserDto: CreateUserDto) {
    console.log('参数:', createUserDto)

    const userExists = await this.userRepository.findOne({
      where: { id: createUserDto.id },
      relations: ['roles']
    })
    console.log(userExists)

    if (!userExists) throw new ApiException('用户不存在', ApiErrorCode.USER_NOTEXIST)
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const userRepo = queryRunner.manager.getRepository(User)
    const roleRepo = queryRunner.manager.getRepository(Role)

    try {
      const newUser = new User()
      newUser.status = createUserDto.status
      newUser.nickname = createUserDto.nickname
      newUser.email = createUserDto.email
      newUser.telephone = createUserDto.telephone
      newUser.username = createUserDto.username
      await userRepo
        .createQueryBuilder('user', queryRunner)
        .update(User)
        .set(newUser)
        .where('id = :id', { id: createUserDto.id })
        .execute()

      if (createUserDto.rolesId?.length) {
        // 查找要分配的新角色
        const assignedRoles = await roleRepo
          .createQueryBuilder('role', queryRunner)
          .where('role.id IN (:...rolesId)', { rolesId: createUserDto.rolesId })
          .getMany()

        // 获取用户现有角色（从第一步的userExists中获取，避免重复查询）
        const existingRoles = userExists.roles

        // 先移除现有角色（替代clear()）
        if (existingRoles.length > 0) {
          await userRepo
            .createQueryBuilder('user', queryRunner)
            .relation(User, 'roles')
            .of(createUserDto.id) // 直接使用已知的用户ID
            .remove(existingRoles) // 移除所有旧角色
        }

        // 再添加新角色
        await userRepo
          .createQueryBuilder('user', queryRunner)
          .relation(User, 'roles')
          .of(createUserDto.id)
          .add(assignedRoles)
      } else {
        // 如果没有传新角色，移除所有现有角色
        const existingRoles = userExists.roles
        if (existingRoles.length > 0) {
          await userRepo
            .createQueryBuilder('user', queryRunner)
            .relation(User, 'roles')
            .of(createUserDto.id)
            .remove(existingRoles)
        }
      }

      // 所有操作成功，提交事务
      await queryRunner.commitTransaction()
      return ResultData.success('用户信息更新成功')
    } catch (error) {
      // 发生错误，回滚事务
      await queryRunner.rollbackTransaction()
      throw new ApiException('更新失败', ApiErrorCode.FAIL)
    } finally {
      // 无论成功失败，都释放查询执行器
      await queryRunner.release()
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

  async getUserList(getUserListDto: GetUserListDto) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .addSelect('user.status')

    if (getUserListDto?.username) {
      queryBuilder.andWhere('user.username LIKE :username', {
        username: `%${getUserListDto.username}%`
      })
    }
    if (getUserListDto?.nickname) {
      queryBuilder.andWhere('user.nickname LIKE :nickname', {
        nickname: `%${getUserListDto.nickname}%`
      })
    }
    if (getUserListDto?.telephone) {
      queryBuilder.andWhere('user.telephone LIKE :telephone', {
        telephone: `%${getUserListDto.telephone}%`
      })
    }
    if (isValidNumber(getUserListDto?.status)) {
      queryBuilder.andWhere('user.status = :status', { status: getUserListDto.status })
    }

    const paginationOptions: IPaginationOptions = {
      page: getUserListDto.currentPage, // 映射 currentPage -> page
      limit: getUserListDto.pageSize // 映射 pageSize -> limit
    }
    const result = await paginateTransform<User>(queryBuilder, paginationOptions)

    result.result = result.result.map((user) => ({
      ...user,
      rolesName: user.roles.map((role) => role.roleName),
      rolesId: user.roles.map((role) => role.id)
    }))
    return ResultData.success('获取用户列表成功', result)
  }
}
