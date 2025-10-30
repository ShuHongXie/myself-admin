import {
  Post,
  Body,
  Request,
  Controller,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common'
import { MenuService } from './menu.service'
import { CreateBaseDto, CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { QueryMenuDto } from './dto/query-menu.dto'
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { Public } from '@decorator/public.decorator'
import { GetMenuTreeDto } from './dto/get-menu-tree.dto'

@ApiTags('菜单权限模块')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '新增菜单' })
  @Post()
  @Public()
  async createMenu(
    @Body()
    createMenuDto: CreateMenuDto
  ) {
    return this.menuService.createMenu(createMenuDto)
  }

  @Get('/getRouters')
  @ApiOperation({ summary: '获取所有菜单(不含按钮)' })
  @Public()
  getRouters() {
    return this.menuService.findAll()
  }

  @Get('/info')
  @ApiOperation({ summary: '获取所有菜单（包含按钮）' })
  @ApiOkResponse({
    description: '返回示例',
    type: GetMenuTreeDto,
    isArray: true
  })
  @Public()
  getMenuTree() {
    return this.menuService.findAllWithButtons()
  }

  @Get('/buttonPermissions')
  @ApiOperation({ summary: '获取用户按钮权限' })
  async getUserButtonPermissions(@Request() req) {
    const { userId } = req.user
    return this.menuService.getUserButtonPermissions(userId)
  }

  @Get('/menusByPage')
  @ApiOperation({ summary: '分页查询菜单列表' })
  @Public()
  findByPage(@Query() queryMenuDto: QueryMenuDto) {
    return this.menuService.findByPage(queryMenuDto)
  }

  @Get('/:id')
  @ApiOperation({ summary: '根据ID获取菜单详情' })
  @Public()
  async getMenuDetail(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id)
  }

  @Put('/:id')
  @ApiOperation({ summary: '更新菜单' })
  @Public()
  async updateMenu(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto)
  }

  @Delete('/:id')
  @ApiOperation({ summary: '删除菜单（需要先删除子菜单）' })
  @Public()
  async deleteMenu(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id)
  }

  @Delete('/:id/cascade')
  @ApiOperation({ summary: '级联删除菜单及其所有子菜单' })
  @Public()
  async removeWithChildren(@Param('id', ParseIntPipe) id: number) {
    await this.menuService.removeWithChildren(id)
    return {
      code: 200,
      msg: '级联删除成功'
    }
  }
}
