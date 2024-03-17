import { CatsService } from "./cats.service";
import { Cat } from "./cat.interface";
export declare class CatsController {
    private catsService;
    constructor(catsService: CatsService);
    findAll(): Promise<Cat[]>;
}
