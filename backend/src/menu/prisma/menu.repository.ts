import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { MenuResponseDto } from '../dto/menu-response.dto';

@Injectable()
export class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<MenuResponseDto> {
    const menu = await this.prisma.menu.create({ data: createMenuDto });
    return this.mapToDto(menu);
  }

  async findAll(): Promise<MenuResponseDto[]> {
    const menus = await this.prisma.menu.findMany();
    return menus.map(this.mapToDto);
  }

  async findOne(id: string, depth: number): Promise<MenuResponseDto | null> {
    const includeRelations =
      depth > 1 ? { children: { include: { children: true } } } : {};

    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: includeRelations,
    });

    return menu ? this.mapToDto(menu) : null;
  }

  async update(
    id: string,
    updateMenuDto: UpdateMenuDto,
  ): Promise<MenuResponseDto> {
    const updatedMenu = await this.prisma.menu.update({
      where: { id },
      data: {
        ...updateMenuDto,
        parentId: updateMenuDto.parentId ?? null, // Ensure null handling
      },
    });
    return this.mapToDto(updatedMenu);
  }

  async remove(id: string): Promise<MenuResponseDto> {
    const deletedMenu = await this.prisma.menu.delete({
      where: { id },
    });
    return this.mapToDto(deletedMenu);
  }

  async findParents(): Promise<MenuResponseDto[]> {
    const parentMenus = await this.prisma.menu.findMany({
      where: { parentId: null },
    });
    return parentMenus.map(this.mapToDto);
  }

  private mapToDto(menu: any): MenuResponseDto {
    return {
      id: menu.id,
      name: menu.name,
      depth: menu.depth,
      parentId: menu.parentId ?? null, // Explicitly set null if undefined
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
    };
  }
}
