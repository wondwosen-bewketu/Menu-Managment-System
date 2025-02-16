import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ example: 'Main Menu', description: 'Name of the menu' })
  name: string;

  @ApiProperty({ example: 1, description: 'Depth level of the menu' })
  depth: number;

  @ApiProperty({ example: null, nullable: true, description: 'Parent menu ID' })
  parentId?: string | null;
}
