import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm'
import encry from '@utils/crypto'
import * as crypto from 'crypto'
import dayjs from 'dayjs'
import { Role } from '@modules/role/entities/role.entity'
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number // 标记为主键，值自动生成
  @Column({ length: 30 })
  username: string //用户名
  @Column({ nullable: true })
  nickname: string //昵称
  //默认密码 123456
  @Column({
    default: ''
  })
  password: string //密码
  @Column({ nullable: true })
  avatar: string //头像
  @Column({ nullable: true })
  email: string //邮箱
  @Column({ nullable: true })
  telephone: string //手机号
  @Column({
    default: 1
  })
  status: number //状态 0:禁用 1:启用
  @Column({ nullable: true, default: 'q5+Kdg==' })
  salt: string
  @Column({ nullable: true, default: 0 })
  isAdmin: number //是否为管理员 1:是 0:否
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
    joinColumn: { name: 'user_id' }, // 关联表中指向当前实体的字段
    inverseJoinColumn: { name: 'role_id' } // 关联表中指向角色的字段
  })
  roles: Role[]
  @CreateDateColumn({
    transformer: {
      to: (value) => {
        return value
      },
      from: (value) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  })
  createTime: Date
  @UpdateDateColumn({
    transformer: {
      to: (value) => {
        return value
      },
      from: (value) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  })
  updateTime: Date
  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64')
    this.password = encry(this.password, this.salt)
  }
}
