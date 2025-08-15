import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ApiException } from 'src/common/filter/api.exception'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiErrorCode } from '@enums/responseCode.enum'
import { ResultData } from '@utils/ResultData'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import encry from '@utils/crypto'
import generateCaptcha from '@utils/generateCaptcha'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }
    })

    if (!user) throw new ApiException('用户名不存在', ApiErrorCode.USER_NOTEXIST)
    return user
  }

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto
    const existUser = await this.userRepository.findOne({
      where: { username }
    })

    if (existUser) throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST)
    try {
      const newUser = new User()
      newUser.username = username
      newUser.password = password
      await this.userRepository.save(newUser)
      return ResultData.success('注册成功')
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
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
}
