import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeleteResult, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>,
        @Inject('NOTIFICATION_SERVICE')
        private client: ClientProxy,
    ) {}

    public async create(categoryData: Category): Promise<Category> {
        const category = await this.repository.save(categoryData);
        this.client.emit('category_created', category);
        return category;
    }

    public findAll(): Promise<Category[]> {
        return this.repository.find();
    }

    public findOne(id: number): Promise<Category | null> {
        return this.repository.findOneBy({ id });
    }

    public  remove(id: number): Promise<DeleteResult>{
        return this.repository.delete(id);
    }
    public paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
        return paginate<Category>(this.repository, options);
    }
}
