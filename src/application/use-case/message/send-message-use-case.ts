import { injectable } from "tsyringe";
import { CreateUseCaseWithUserType, DefaultCreateUseCaseType } from "../../types/default-use-case";
import { MessageRepository } from "../../../external/database/repository/message.repository";
import { BadRequestError } from "routing-controllers";
import datasource from "../../../external/database/datasource";
import MessageEntity from "../../../domain/entities/message.entity";
import { v4 as uuidV4 } from 'uuid';
import CountMessageEntity from "../../../domain/entities/count-message.entity";
import moment from "moment";
import UserEntity from "../../../domain/entities/user.entity";
import { Repository } from "typeorm";

@injectable()
export class SendMessageUseCase {
    constructor(private readonly messageRepository: MessageRepository) { }

    async execute({ data, user }: CreateUseCaseWithUserType<any>) {
        const queryRunner = datasource.createQueryRunner()

        try {
       
            queryRunner.startTransaction()
            const messageEntity = queryRunner.manager.getRepository(MessageEntity) 
            const countMessageEntity = queryRunner.manager.getRepository(CountMessageEntity) 
    
        
            const countMessage = await this.countMessage(countMessageEntity, user)

          
            const message = {
                id: uuidV4(),
                companyId: user.companyId,
                content: 'TEXT'
            }
      
          

            await queryRunner.commitTransaction()
            return countMessage
        } catch (err) {
            await queryRunner.rollbackTransaction()
        } finally {
            await queryRunner.release()
        }
    }

    async countMessage(countMessageEntity: Repository<CountMessageEntity>, user: UserEntity) {
        const startMonth = moment().startOf('month')
        const findCurrentMonth = countMessageEntity.findOne({ where: { companyId: user.companyId, date: startMonth.toDate() } })
        if(findCurrentMonth) {
            return findCurrentMonth
        }
        return countMessageEntity.save({ id: uuidV4(), companyId: user.companyId, date: startMonth.toDate() })
    }
}