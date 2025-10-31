import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Menu } from './menu.entity'

@Entity('menu_meta')
export class MenuMeta {
  @PrimaryGeneratedColumn()
  id: number
  // 标题
  @Column({
    length: 20,
    nullable: true
  })
  title: string
  // 排序
  @Column({
    type: 'tinyint',
    default: 1
  })
  orderNum: number
  // 菜单图标
  @Column({
    length: 50,
    nullable: true
  })
  icon: string
  // 是否显示在面包栏
  @Column({
    type: 'boolean',
    default: false
  })
  showInBreadcrumb: boolean
  // 是否显示在标签栏
  @Column({
    type: 'boolean',
    default: false
  })
  showInTab: boolean
  // 是否显示在菜单栏
  @Column({
    type: 'boolean',
    default: false
  })
  showInMenu: boolean
  // 是否针对组件进行缓存
  @Column({
    type: 'boolean',
    default: false
  })
  isCache: boolean
  // 反向关联 Menu（一对一：与 Menu 双向绑定）,如果需要从menu_meta查询menu则需要，反之不需要配置
  // @OneToOne(() => Menu, (menu) => menu.meta) // 指向 Menu 的 meta 字段
  // menu: Menu // 关联的菜单对象
}
