import { Post, Body, Request, Controller, Get } from '@nestjs/common'
import { MenuService } from './menu.service'
import { CreateBaseDto, CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { Public } from '@decorator/public.decorator'

@ApiTags('菜单权限模块')
@Controller('')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Post('create')
  @Public()
  @ApiParam({ name: 'createMenuDto', type: CreateMenuDto })
  @ApiOperation({ summary: '新增菜单' })
  async createMenu(
    @Body()
    createMenuDto: CreateMenuDto | CreateBaseDto
  ) {
    return await this.menuService.createMenu(createMenuDto)
  }

  @Get('/getRouters')
  @ApiOperation({ summary: '获取所有菜单(不含按钮)' })
  @Public()
  findAll() {
    return this.menuService.findAll(false)
  }

  @Get('/menu/info')
  @ApiOperation({ summary: '获取所有菜单' })
  @Public()
  find() {
    return this.menuService.findAll()
  }
}
