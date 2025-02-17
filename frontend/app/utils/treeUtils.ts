import { MenuItem } from "../types";

export const buildTree = (
  menuItems: MenuItem[],
  selectedParentId: string | null
): MenuItem[] => {
  const menuMap: Record<string, MenuItem> = {};
  const tree: MenuItem[] = [];

  menuItems.forEach((item) => {
    menuMap[item.id] = { ...item, children: [] };
  });

  menuItems.forEach((item) => {
    if (item.parentId && menuMap[item.parentId]) {
      menuMap[item.parentId].children?.push(menuMap[item.id]);
    } else {
      tree.push(menuMap[item.id]);
    }
  });

  if (selectedParentId) {
    return tree.filter(
      (item) =>
        item.id === selectedParentId || item.parentId === selectedParentId
    );
  }

  return tree;
};
