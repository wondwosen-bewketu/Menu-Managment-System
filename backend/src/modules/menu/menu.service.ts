import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MenuRepository } from './prisma';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { MenuResponseDto } from './dto/menu-response.dto';
import { MENU_CONSTANTS } from '../../common/constants/menu.constants';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);

  constructor(private readonly repository: MenuRepository) {}

  async createMenu(dto: CreateMenuDto): Promise<MenuResponseDto> {
    await this.validateParent(dto.parentId);
    return this.repository.create(dto);
  }

  async fetchParentMenus(): Promise<MenuResponseDto[]> {
    return this.repository.findParents();
  }

  async getMenu(id: string): Promise<MenuResponseDto> {
    const menu = await this.repository.findById(id);
    if (!menu) {
      throw new NotFoundException(MENU_CONSTANTS.ERROR_MESSAGES.NOT_FOUND);
    }
    return menu;
  }

  async getAllMenus(): Promise<MenuResponseDto[]> {
    return this.repository.findAll();
  }

  async updateMenu(id: string, dto: UpdateMenuDto): Promise<MenuResponseDto> {
    await this.validateParent(dto.parentId);
    try {
      return await this.repository.update(id, dto);
    } catch (error) {
      throw new NotFoundException(MENU_CONSTANTS.ERROR_MESSAGES.NOT_FOUND);
    }
  }

  async deleteMenu(id: string): Promise<MenuResponseDto> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new NotFoundException(MENU_CONSTANTS.ERROR_MESSAGES.NOT_FOUND);
    }
  }

  private async validateParent(parentId?: string): Promise<void> {
    if (!parentId) return;

    const parent = await this.repository.findById(parentId);
    if (!parent) {
      throw new NotFoundException(
        MENU_CONSTANTS.ERROR_MESSAGES.PARENT_NOT_FOUND,
      );
    }

    if (parent.depth >= MENU_CONSTANTS.VALIDATION.MAX_DEPTH) {
      throw new Error(MENU_CONSTANTS.ERROR_MESSAGES.MAX_DEPTH_EXCEEDED);
    }
  }
}
