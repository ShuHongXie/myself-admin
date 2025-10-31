import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { GetRoleListDto } from './dto/get-role-list.dto'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { Public } from '@decorator/public.decorator'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '创建角色' })
  @Public()
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @ApiOperation({ summary: '获取角色分页列表' })
  @Public()
  @Post('rolesByPage')
  getRolesByPage(@Body() getRoleListDto: GetRoleListDto) {
    return this.roleService.getRolesByPage(getRoleListDto)
  }

  @ApiOperation({ summary: '获取所有角色列表' })
  @ApiOkResponse({
    description: '返回示例',
    type: GetRoleListDto,
    isArray: true
  })
  @Public()
  @Get('allRoles')
  getRolesList() {
    return this.roleService.getAllRoles()
  }

  @ApiOperation({ summary: '获取单个角色信息' })
  @Public()
  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.roleService.findOne(+id)
  }

  @ApiOperation({ summary: '更新角色' })
  @Public()
  @Put(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto)
  }

  @ApiOperation({ summary: '删除角色' })
  @Public()
  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.remove(+id)
  }
}
