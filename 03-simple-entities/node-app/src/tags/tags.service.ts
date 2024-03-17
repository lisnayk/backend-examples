import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private TagsRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.TagsRepository.find();
  }

  findOne(id: number): Promise<Tag | null> {
    return this.TagsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.TagsRepository.delete(id);
  }
}
