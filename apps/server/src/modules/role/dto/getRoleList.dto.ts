import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { Menu } from '@modules/menu/entities/menu.entity'
export class GetRoleListDto {
  @IsOptional()
  @ApiProperty({
    example: '技术人员'
  })
  roleName: string

  @IsOptional()
  @ApiProperty({
    example: 1,
    description: '角色状态，1表示启用，0表示禁用'
  })
  status: number
  @IsOptional()
  @ApiProperty({
    example: '菜单权限'
  })
  menus?: Menu[]

  @ApiProperty({
    example: 1704067200000,
    description: '创建时间筛选开始日期时间戳',
    required: false,
    type: Number
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: '开始创建时间必须是有效的时间戳数字' })
  startCreateDate?: number

  @ApiProperty({
    example: 1735689599999,
    description: '创建时间筛选结束日期时间戳',
    required: false,
    type: Number
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: '结束创建时间必须是有效的时间戳数字' })
  endCreateDate?: number
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 1,
    description: '页码'
  })
  currentPage: number
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 10,
    description: '页面大小'
  })
  pageSize: number
}
