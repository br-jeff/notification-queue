import { NodeEnvEnum } from "../../domain/enums/node-env";
import settings from "../config/settings";
import { logger } from "../utils/logger";
import datasource from "./datasource";

export default async function startupDB() {
  const connection = await datasource.initialize()
  if(settings.NODE_ENV === NodeEnvEnum.DEV) {
    try {
      await connection.query('select * from plans');
    } catch(err) {
      // if not have plans run migrations
      logger.info('Starting running migrations')
      await connection.runMigrations();
    }  
  }
}