"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = ormConfig;
function ormConfig() {
    const commonConf = {
        SYNCRONIZE: true,
        ENTITIES: [__dirname + '/src/**/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/src/migrations/**/*{.ts,.js}'],
        MIGRATIONS_RUN: false,
    };
    return {
        name: 'default',
        type: 'mysql',
        database: 'nestforawm',
        host: 'localhost',
        port: Number(3306),
        username: 'root',
        password: 'root',
        logging: true,
        synchronize: false,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN,
        charset: 'utf8mb4',
        timezone: '+09:00',
        keepConnectionAlive: true,
        autoLoadEntities: true,
    };
}
//# sourceMappingURL=orm.config.js.map