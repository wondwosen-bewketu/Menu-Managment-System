// src/modules/menu/dto/menu-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MenuResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Main Menu' })
  name: string;

  @ApiProperty({ example: 1 })
  depth: number;

  @ApiProperty({ example: null, nullable: true })
  parentId: string | null;

  @ApiProperty({ type: () => [MenuResponseDto], required: false })
  @Type(() => MenuResponseDto)
  children?: MenuResponseDto[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
