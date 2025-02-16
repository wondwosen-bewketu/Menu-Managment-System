import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { MenuResponseDto } from './dto/menu-response.dto';

@ApiTags('Menu Management')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create new menu' })
  @ApiResponse({ status: 201, type: MenuResponseDto })
  async create(@Body() dto: CreateMenuDto): Promise<MenuResponseDto> {
    return this.menuService.createMenu(dto);
  }

  @Get('parents')
  @ApiOperation({ summary: 'Get all parent menus' })
  @ApiResponse({
    status: 200,
    type: [MenuResponseDto],
    description: 'Returns all top-level parent menus',
  })
  async fetchParentMenus(): Promise<MenuResponseDto[]> {
    return this.menuService.fetchParentMenus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu by ID' })
  @ApiResponse({ status: 200, type: MenuResponseDto })
  async getById(@Param('id') id: string): Promise<MenuResponseDto> {
    return this.menuService.getMenu(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, type: [MenuResponseDto] })
  async getAll(): Promise<MenuResponseDto[]> {
    return this.menuService.getAllMenus();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update menu' })
  @ApiResponse({ status: 200, type: MenuResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMenuDto,
  ): Promise<MenuResponseDto> {
    return this.menuService.updateMenu(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu' })
  @ApiResponse({ status: 200, type: MenuResponseDto })
  async delete(@Param('id') id: string): Promise<MenuResponseDto> {
    return this.menuService.deleteMenu(id);
  }
}
