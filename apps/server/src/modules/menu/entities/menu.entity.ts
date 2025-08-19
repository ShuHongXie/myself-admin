import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne
} from 'typeorm'
import { MenuMeta } from './menu-meta.entity'
@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number
  //标题
  @Column({
    length: 20
  })
  name: string
  //父id
  @Column({ nullable: true })
  parentId: number
  //菜单类型 1:目录,2:菜单,3:按钮
  @Column()
  menuType: number
  //组件路径
  @Column({
    length: 50,
    nullable: true
  })
  component: string
  //权限标识
  @Column({
    length: 50,
    nullable: true
  })
  permission: string
  //路由跳转地址
  @Column({
    length: 50
  })
  path: string
  //状态 1:启用 0:禁用
  @Column({
    default: 1
  })
  status: number
  // 父菜单关联（多对一：多个子菜单可属于一个父菜单）
  @ManyToOne(() => Menu, (menu) => menu.children) // 反向引用 children 字段
  @JoinColumn({ name: 'parentId' }) // 绑定到 parent_id 字段
  parent: Menu // 父菜单对象
  // 子菜单关联（一对多：一个父菜单可包含多个子菜单）
  @OneToMany(() => Menu, (menu) => menu.parent, {
    // 反向引用 parent 字段（关键修复）
    cascade: true,
    eager: false
  })
  children: Menu[] // 子菜单数组
  // 关联菜单元数据（一对一：一个菜单对应一个 meta 配置）
  @OneToOne(() => MenuMeta, {
    cascade: true, // 级联操作：保存/删除路由时，同步处理 meta
    eager: true // 查询路由时自动加载 meta（避免手动关联查询）
  })
  @JoinColumn({ name: 'metaId' }) // 外键在 route_meta 表中
  meta: MenuMeta
  @Column({
    type: 'bigint'
  })
  createBy: number
  @CreateDateColumn()
  createTime: Date
  @UpdateDateColumn()
  updateTime: Date
}
