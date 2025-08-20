import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名不可为空' })
  @ApiProperty({
    example: '技术人员'
  })
  roleName: string

  @ApiProperty({
    example: '备注',
    required: false
  })
  @IsOptional()
  remark?: string

  @IsNotEmpty({ message: '角色状态不可为空' })
  @ApiProperty({
    example: 1,
    description: '角色状态，1表示启用，0表示禁用'
  })
  status: number

  @ApiProperty({
    example: [1],
    required: false
  })
  @IsOptional()
  @IsArray({
    message: 'menuIds必须是数组'
  })
  @IsNumber({}, { each: true, message: 'menuIds必须是数字数组' })
  menuIds?: number[]

  @IsNotEmpty({ message: '排序不可为空' })
  @ApiProperty({
    example: 1
  })
  roleSort: number

  @ApiProperty({
    example: 1
  })
  @IsOptional()
  createBy: number
  @ApiProperty({
    example: 1
  })
  @IsOptional()
  updateBy: number
}
