import { Repository } from 'typeorm';
import { User } from './tag.entity';
export declare class TagsService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    remove(id: number): Promise<void>;
}
