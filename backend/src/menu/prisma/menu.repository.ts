import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';

@Injectable()
export class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Helper for hierarchical (recursive) queries.
  buildInclude(depth: number) {
    if (depth === 0) return undefined;
    return {
      children: {
        include: this.buildInclude(depth - 1),
      },
    };
  }

  async create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: {
        name: createMenuDto.name,
        depth: createMenuDto.depth,
        parentId: createMenuDto.parentId ?? null,
      },
    });
  }

  async findAll() {
    return this.prisma.menu.findMany();
  }

  async findOne(id: number, depth: number) {
    const include = this.buildInclude(depth);
    return this.prisma.menu.findUnique({
      where: { id },
      include,
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: {
        name: updateMenuDto.name,
        depth: updateMenuDto.depth,
        parentId: updateMenuDto.parentId,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}
