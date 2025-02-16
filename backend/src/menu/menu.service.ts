import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuRepository } from './prisma/menu.repository';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuResponseDto } from './dto/menu-response.dto';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async create(createMenuDto: CreateMenuDto): Promise<MenuResponseDto> {
    return this.menuRepository.create(createMenuDto);
  }

  async findAll(): Promise<MenuResponseDto[]> {
    return this.menuRepository.findAll();
  }

  async fetchParentMenus(): Promise<MenuResponseDto[]> {
    return this.menuRepository.findParents();
  }
  async findOne(id: string, depth: number): Promise<MenuResponseDto> {
    const menu = await this.menuRepository.findOne(id, depth);
    if (!menu) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
    return menu;
  }

  async update(
    id: string,
    updateMenuDto: UpdateMenuDto,
  ): Promise<MenuResponseDto> {
    try {
      return await this.menuRepository.update(id, updateMenuDto);
    } catch (error) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
  }

  async remove(id: string): Promise<MenuResponseDto> {
    try {
      return await this.menuRepository.remove(id);
    } catch (error) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
  }
}
