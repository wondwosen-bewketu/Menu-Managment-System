export class MenuEntity {
  id: number;
  name: string;
  depth: number;
  parentId?: number;
  children?: MenuEntity[];
  createdAt: Date;
  updatedAt: Date;
}
