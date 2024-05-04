import { container } from "tsyringe";
import { CompanyEntity } from "../../domain/entities/company";
import PlanEntity from "../../domain/entities/plan.entity";
import UserEntity from "../../domain/entities/user.entity";
import { NodeEnvEnum } from "../../domain/enums/node-env";
import settings from "../config/settings";
import { logger } from "../utils/logger";
import datasource from "./datasource";
import { EncryptionProvider } from "../../domain/providers/encryption-provider";

export default async function startupDB() {
  const connection = await datasource.initialize()
  if(settings.NODE_ENV === NodeEnvEnum.DEV) {
    try {
      await connection.query('select * from plans');
    } catch(err) {
      // if not have plans run migrations
      logger.info('Starting running migrations')
      await connection.runMigrations();
      await runSeeds()
    }  
  }
}

async function runSeeds() {
  await PlanEntity.save({
    id: '0e0643bf-fae3-4d50-b48a-75833f77b795',
    name: 'Basic Plan',
    messagePerMonth: 200
  })
  await CompanyEntity.save({
    id: '39f2d121-46b6-46a6-af12-ff614fce57a4',
    planId: '0e0643bf-fae3-4d50-b48a-75833f77b795',
    name: 'Company A'
  })

  await UserEntity.save({
    id: 'afcb2377-cc31-4d92-b81b-c0e9322ceeaa',
    name: 'Admin Company A',
    username: 'CompanyA',
    companyId: '39f2d121-46b6-46a6-af12-ff614fce57a4',
    password: await container.resolve(EncryptionProvider).createHash('123')
  })
}