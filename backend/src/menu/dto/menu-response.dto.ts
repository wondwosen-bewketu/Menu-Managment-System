export class MenuResponseDto {
  id: number;
  name: string;
  depth: number;
  parentId?: number;
  children?: MenuResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}
