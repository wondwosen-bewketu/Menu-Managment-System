// src/common/utils/menu.util.ts
import { MenuResponseDto } from '../../modules/menu/dto';

export class MenuTreeBuilder {
  static buildTree(menus: MenuResponseDto[]): MenuResponseDto[] {
    const map = new Map<string, MenuResponseDto>();
    const roots: MenuResponseDto[] = [];

    menus.forEach((menu) => {
      map.set(menu.id, { ...menu, children: [] });
    });

    menus.forEach((menu) => {
      if (menu.parentId && map.has(menu.parentId)) {
        map.get(menu.parentId).children.push(map.get(menu.id));
      } else {
        roots.push(map.get(menu.id));
      }
    });

    return roots;
  }

  static flattenTree(menu: MenuResponseDto): MenuResponseDto[] {
    const result: MenuResponseDto[] = [];
    const queue: MenuResponseDto[] = [menu];

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current);
      if (current.children) {
        queue.push(...current.children);
      }
    }

    return result;
  }
}
