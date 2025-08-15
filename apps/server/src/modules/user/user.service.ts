import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ApiException } from 'src/common/filter/api.exception'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ApiErrorCode } from '@enums/responseCode.enum'
import { ResultData } from '@utils/ResultData'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

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
}
