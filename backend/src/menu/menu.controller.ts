import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuResponseDto } from './dto/menu-response.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto): Promise<MenuResponseDto> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  async findAll(): Promise<MenuResponseDto[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('depth') depth: string,
  ): Promise<MenuResponseDto> {
    const depthValue = depth ? parseInt(depth, 10) : 2;
    return this.menuService.findOne(+id, depthValue);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<MenuResponseDto> {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MenuResponseDto> {
    return this.menuService.remove(+id);
  }
}
