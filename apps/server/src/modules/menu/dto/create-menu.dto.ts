// src/modules/menu/dto/create-menu.dto.ts
import { IsInt, IsString, IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

// 菜单元数据 DTO
class CreateMenuMetaDto {
  @IsString()
  title: string

  @IsInt()
  orderNum: number

  @IsOptional()
  @IsString()
  icon?: string

  @IsOptional()
  showInBreadcrumb?: boolean

  @IsOptional()
  showInTab?: boolean

  @IsOptional()
  showInMenu?: boolean

  @IsOptional()
  isCache?: boolean
}

// 菜单 DTO
export class CreateMenuDto {
  @IsString()
  name: string

  @IsOptional()
  @IsInt()
  parentId?: number

  @IsInt()
  menuType: number

  @IsOptional()
  @IsString()
  component?: string

  @IsOptional()
  @IsString()
  permission?: string

  @IsString()
  path: string

  @IsOptional()
  @IsInt()
  status?: number = 1

  @IsInt()
  createBy: number

  // 嵌套元数据
  @ValidateNested()
  @Type(() => CreateMenuMetaDto)
  meta: CreateMenuMetaDto

  // 可选的子菜单（递归结构）
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuDto)
  children?: CreateMenuDto[]
}
