import { DataSource, Repository } from 'typeorm';
import { UserAuthority } from '../entity/user-authority.entity';
export declare class UserAuthorityRepository extends Repository<UserAuthority> {
    private dataSource;
    constructor(dataSource: DataSource);
}
