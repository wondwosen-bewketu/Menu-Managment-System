import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto, MenuResponseDto } from '../dto';

@Injectable()
export class MenuRepository {
  private readonly logger = new Logger(MenuRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMenuDto): Promise<MenuResponseDto> {
    return this.prisma.menu.create({
      data: {
        ...dto,
        depth: await this.calculateDepth(dto.parentId),
      },
    });
  }

  async findAll(): Promise<MenuResponseDto[]> {
    return this.prisma.menu.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(id: string): Promise<MenuResponseDto | null> {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateMenuDto): Promise<MenuResponseDto> {
    return this.prisma.menu.update({
      where: { id },
      data: {
        ...dto,
        depth: dto.parentId
          ? await this.calculateDepth(dto.parentId)
          : undefined,
      },
    });
  }

  async delete(id: string): Promise<MenuResponseDto> {
    return this.prisma.menu.delete({ where: { id } });
  }

  private async calculateDepth(parentId?: string): Promise<number> {
    if (!parentId) return 1;
    const parent = await this.prisma.menu.findUnique({
      where: { id: parentId },
      select: { depth: true },
    });
    return parent ? parent.depth + 1 : 1;
  }

  async findParents(): Promise<MenuResponseDto[]> {
    return this.prisma.menu.findMany({
      where: {
        parentId: null,
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
