export interface MenuItem {
  id: string;
  name: string;
  parentId?: string | null;
  depth: number;
  children?: MenuItem[];
}
