import { DataSource } from "typeorm"
import settings from "../config/settings"
import { join } from "path";
import getInstancesFromDirectory from "../utils/get-instances-from-directory";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export = new DataSource({
    type:  settings.database.DRIVER,
    host: settings.database.HOST,
    port:  settings.database.PORT,
    username: settings.database.USER,
    password:  settings.database.PASSWORD,
    database: settings.database.DB_NAME,
    entities: getInstancesFromDirectory(join(__dirname, '../../domain/entities')),
    migrations: getInstancesFromDirectory(join(__dirname, './migrations')),
    namingStrategy: new SnakeNamingStrategy(),
})
