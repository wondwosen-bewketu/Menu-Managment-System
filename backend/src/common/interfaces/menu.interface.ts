export interface Menu {
    id: number;
    name: string;
    depth: number;
    parentId?: number;
    children?: Menu[];
    createdAt: Date;
    updatedAt: Date;
  }
  