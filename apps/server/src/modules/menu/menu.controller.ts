import { Post, Body, Request, Controller } from '@nestjs/common'
import { MenuService } from './menu.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { Public } from '@decorator/public.decorator'

@ApiTags('菜单权限模块')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Post('/createMenu')
  @Public()
  @ApiParam({ name: 'createMenuDto', type: CreateMenuDto })
  @ApiOperation({ summary: '新增菜单' })
  async createMenu(
    @Body()
    createMenuDto: CreateMenuDto
  ) {
    return await this.menuService.createMenu(createMenuDto)
  }

  // @Post('getInfo')
  // @ApiOperation({ summary: '获取路由' })
  // async getInfo(@Request() req) {
  //   return await this.menuService.getInfo(req)
  // }
}
