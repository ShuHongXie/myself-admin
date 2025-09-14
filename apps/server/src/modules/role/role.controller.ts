import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { GetRoleListDto } from './dto/getRoleList.dto'
import { ApiOperation } from '@nestjs/swagger'
import { Public } from '@decorator/public.decorator'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '创建角色' })
  @Public()
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @ApiOperation({ summary: '获取角色分页列表' })
  @Public()
  @Get('rolesByPage')
  getRolesByPage(@Query() getRoleListDto: GetRoleListDto) {
    return this.roleService.getRolesByPage(getRoleListDto)
  }

  @ApiOperation({ summary: '获取所有角色列表' })
  @Public()
  @Get('allRoles')
  getAllRoles() {
    return this.roleService.getAllRoles()
  }

  @ApiOperation({ summary: '获取单个角色信息' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id)
  }

  @ApiOperation({ summary: '部分更新角色' })
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto)
  }

  @ApiOperation({ summary: '完全更新角色' })
  @Public()
  @Put(':id')
  replace(@Param('id') id: string, @Body() createRoleDto: CreateRoleDto) {
    return this.roleService.replace(+id, createRoleDto)
  }

  @ApiOperation({ summary: '删除角色' })
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id)
  }
}
