import { User } from './tag.entity';
import { TagsService } from './tags.service';
export declare class TagsController {
    private tagsService;
    constructor(tagsService: TagsService);
    findAll(): Promise<User[]>;
}
