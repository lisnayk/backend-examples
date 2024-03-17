import { CatsService } from './cats.service';
import { Cat } from './tag.interface';
export declare class CatsController {
    private catsService;
    constructor(catsService: CatsService);
    findAll(): Promise<Cat[]>;
}
