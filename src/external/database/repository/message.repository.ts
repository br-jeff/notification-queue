import { injectable } from 'tsyringe';
import { DefaultCreateUseCaseType, DefaultFilterUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case';
import MessageEntity from '../../../domain/entities/message.entity';
import { v4 as uuidV4 } from 'uuid';
import { BadRequestError } from 'routing-controllers';


@injectable()
export class MessageRepository {
    async list({ filters, pagination }: DefaultListUseCaseType<MessageEntity>) {
        const skip = pagination.page * pagination.size;
        const take = pagination.size;
        const [data, total] = await MessageEntity.findAndCount({
            skip,
            take
        });
        return { data, total}
    }

    createMessage({ data }: DefaultCreateUseCaseType<MessageEntity>) {
        if (!data) return;
        return MessageEntity.save({ ...data, id: uuidV4() } as MessageEntity);
    }

    findById({ filters }: DefaultFilterUseCaseType<{ id: string; }>) {
        if (!filters || !filters.id) {
            throw new BadRequestError('id is not defined');
        }
        return MessageEntity.findOne({
            where: { id: filters.id }
        });
    }
}
