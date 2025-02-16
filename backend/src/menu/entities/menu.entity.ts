export class MenuEntity {
  id: number;
  name: string;
  depth: number;
  parentId?: string | null;
  children?: MenuEntity[];
  createdAt: Date;
  updatedAt: Date;
}
