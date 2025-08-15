import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import encry from '@utils/crypto'
import * as crypto from 'crypto'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number // 标记为主键，值自动生成

  @Column({ length: 30 })
  username: string //用户名
  @Column({ nullable: true })
  nickname: string //昵称
  @Column()
  password: string //密码
  @Column({ nullable: true })
  avatar: string //头像
  @Column({ nullable: true })
  email: string //邮箱
  @Column({ nullable: true })
  role: string //角色
  @Column({ nullable: true })
  salt: string
  @CreateDateColumn({
    type: 'timestamp', // 数据库字段类型
    comment: '创建时间'
  })
  create_time: Date

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间'
  })
  update_time: Date

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64')
    this.password = encry(this.password, this.salt)
  }
}
