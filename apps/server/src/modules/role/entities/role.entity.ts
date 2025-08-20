import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Menu } from '../../menu/entities/menu.entity'
import dayjs from 'dayjs'
// import { Permission } from '@modules/permission/entities/permission.entity'
@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number
  //角色名
  @Column({
    length: 20
  })
  roleName: string
  //排序
  @Column()
  roleSort: number
  //角色状态 启用:1 关闭:0
  @Column({
    default: 1
  })
  status: number
  //备注
  @Column({ length: '100', nullable: true })
  remark: string
  //创建人Id
  @Column()
  createBy: number
  //更新人Id
  @Column()
  updateBy: number
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
  @ManyToMany(() => Menu)
  @JoinTable({
    name: 'role_menu_relation'
  })
  menus: Menu[]
  // @ManyToMany(() => Permission)
  // @JoinTable({
  //   name: 'role_permission_relation',
  //   joinColumn: { name: 'role_id' },
  //   inverseJoinColumn: { name: 'permission_id' }
  // })
  // permissions: Permission[]
}
