
import { injectable } from 'tsyringe';
import { DefaultCreateUseCaseType, DefaultFilterUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case';
import UserEntity from '../../../domain/entities/user.entity';
import { v4 as uuidV4 } from 'uuid';
import { BadRequestError } from 'routing-controllers';


@injectable()
export class UserRepository {
    async list({ filters, pagination, trx }: DefaultListUseCaseType<UserEntity>) {
        const skip = pagination.page;
        const take = pagination.size;
        return UserEntity.findAndCount({
            skip,
            take
        });
    }

    createUser({ data, trx }: DefaultCreateUseCaseType<UserEntity>) {
        if (!data) return;
        return UserEntity.save({ ...data, id: uuidV4() } as UserEntity);
    }

    findById({ filters, trx }: DefaultFilterUseCaseType<{ id: string; }>) {
        if (!filters || !filters.id) {
            throw new BadRequestError('id is not defined');
        }
        return UserEntity.find({
            where: { id: filters.id }
        });
    }

    getUserNameByCompanyId({ filters, trx }: DefaultFilterUseCaseType<{ companyId: string; username: string; }>) {
        return UserEntity.findOne({
            where: {
                companyId: filters?.companyId,
                username: filters?.username
            }
        });
    }

    getUserByName({ filters, trx }: DefaultFilterUseCaseType<{ username: string; }>) {
        return UserEntity.findOne({
            where: {
                username: filters?.username
            }
        });
    }
}
