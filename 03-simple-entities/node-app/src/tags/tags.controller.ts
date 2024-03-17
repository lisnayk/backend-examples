import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';

@Controller('tags')
@ApiTags('Tag')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Get('tag/:id')
  @ApiParam({ name: 'id', description: 'Tag ID' }) // Add route parameter documentation
  async findOneByTagId(@Param('id') id: number): Promise<Tag> {
    return this.tagsService.findOne(id);
  }
}
