import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the category',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Gadgets and devices',
    description: 'The description of the category',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 'electronics.png',
    description: 'The image filename of the category',
  })
  @Column()
  image: string;

  @ApiProperty({ description: 'The creation date of the category' })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @ApiProperty({ description: 'The last update date of the category' })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
