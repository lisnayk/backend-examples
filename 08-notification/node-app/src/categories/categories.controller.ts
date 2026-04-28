import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { Resource, Roles, Scopes } from 'nest-keycloak-connect';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth('OAuth2')
@Controller('categories')
@Resource('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('')
  @Scopes('read')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Return all categories.',
    type: Category,
    isArray: true,
  })
  index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Category>> {
    return this.categoriesService.paginate({ limit: limit, page: page });
  }

  @Get(':id')
  @Scopes('view')
  @Roles({ roles: ['view', 'write'] })
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the category.',
    type: Category,
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  show(@Param('id') id: number): Promise<Category | null> {
    return this.categoriesService.findOne(id);
  }

  @Post('')
  @Scopes('write')
  @Roles({ roles: ['write'] })
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    type: Category,
  })
  store(@Body() categoryData: Category): Promise<Category> {
    return this.categoriesService.create(categoryData);
  }

  @Delete(':id')
  @Scopes('write')
  @Roles({ roles: ['write'] })
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.',
  })
  async delete(@Param('id') id: number): Promise<void> {
    const result = await this.categoriesService.remove(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }
}
