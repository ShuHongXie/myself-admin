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
  showInBreadcrumb?: boolean = true

  @IsOptional()
  showInTab?: boolean = true

  @IsOptional()
  showInMenu?: boolean = true

  @IsOptional()
  isCache?: boolean = false
}

// 按钮类型菜单专用DTO（不需要meta和children）
export class CreateBaseDto {
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

  @IsOptional()
  @IsString()
  path?: string

  @IsOptional()
  @IsInt()
  status?: number = 1

  @IsInt()
  createBy: number
}

// 目录和菜单专用DTO
export class CreateMenuDto extends CreateBaseDto {
  // 嵌套元数据
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMenuMetaDto)
  meta?: CreateMenuMetaDto

  // 可选的子菜单（递归结构）
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuDto)
  children?: CreateMenuDto[]
}
