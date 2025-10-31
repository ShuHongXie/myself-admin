import { IsOptional, IsInt, IsString, IsBoolean, ValidateNested, IsArray } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'

class MenuMetaDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '系统管理',
    description: '标题',
    required: false
  })
  title?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: '排序号',
    required: false
  })
  orderNum?: number

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'el-icon-setting',
    description: '菜单图标',
    required: false
  })
  icon?: string

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({
    example: true,
    description: '是否显示在面包屑: true-显示 false-隐藏',
    required: false
  })
  showInBreadcrumb?: boolean

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({
    example: true,
    description: '是否显示在标签栏: true-显示 false-隐藏',
    required: false
  })
  showInTab?: boolean

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({
    example: true,
    description: '是否显示在菜单栏: true-显示 false-隐藏',
    required: false
  })
  showInMenu?: boolean

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({
    example: true,
    description: '是否缓存: true-缓存 false-不缓存',
    required: false
  })
  isCache?: boolean
}

@ApiSchema({
  description: '',
  name: 'Menu'
})
export class GetMenuTreeDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: '菜单ID',
    required: false
  })
  id?: number

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '系统管理',
    description: '菜单名称',
    required: false
  })
  name?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: '菜单类型: 1-目录 2-菜单 3-按钮',
    required: false
  })
  menuType?: number

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: '菜单状态: 0-停用 1-启用',
    required: false
  })
  status?: number

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '/system',
    description: '路由跳转地址',
    required: false
  })
  path?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'System/Index',
    description: '组件路径',
    required: false
  })
  component?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'system:list',
    description: '权限标识',
    required: false
  })
  permission?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    example: 0,
    description: '父级菜单ID',
    required: false
  })
  parentId?: number

  @IsOptional()
  @ValidateNested()
  @Type(() => MenuMetaDto)
  @ApiProperty({
    description: '菜单元数据',
    required: false,
    type: () => MenuMetaDto
  })
  meta?: MenuMetaDto

  // 添加 children 字段
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetMenuTreeDto)
  @ApiProperty({
    description: '子菜单列表',
    required: false,
    type: () => GetMenuTreeDto,
    isArray: true
  })
  children?: GetMenuTreeDto[]
}
