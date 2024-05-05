import { injectable } from "tsyringe";
import { CreateUseCaseWithUserType } from "../../types/default-use-case";
import datasource from "../../../external/database/datasource";
import MessageEntity from "../../../domain/entities/message.entity";
import { v4 as uuidV4 } from 'uuid';
import CountMessageEntity from "../../../domain/entities/count-message.entity";
import moment from "moment";
import UserEntity from "../../../domain/entities/user.entity";
import { Repository } from "typeorm";
import { SendMessageSchema } from "../../../domain/schemas/send-message.schema";

@injectable()
export class SendMessageUseCase {
    constructor() { }

    async execute({ data, user }: CreateUseCaseWithUserType<SendMessageSchema>) {
        const queryRunner = datasource.createQueryRunner()
        try {
            console.log({ data })

            queryRunner.startTransaction()
            const messageEntity = queryRunner.manager.getRepository(MessageEntity) 
            const countMessageEntity = queryRunner.manager.getRepository(CountMessageEntity) 
    
            const countMessage = await this.countMessage(countMessageEntity, user)

            await messageEntity.save({
                id: uuidV4(),
                companyId: user.companyId,
                content: data.content
            })




            //TODO: Incriment countMessage
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
        const findCurrentMonth = countMessageEntity.findOne({ where: { companyId: user.companyId, dateCount: startMonth.toDate() } })
        if(findCurrentMonth) {
            return findCurrentMonth
        }
        console.log('NÂO TEM')
        return countMessageEntity.save({ id: uuidV4(), companyId: user.companyId, dateCount: startMonth.toDate() })
    }
}