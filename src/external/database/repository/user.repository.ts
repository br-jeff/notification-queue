
import { injectable } from 'tsyringe';
import { DefaultCreateUseCaseType, DefaultFilterUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case';
import UserEntity from '../../../domain/entities/user.entity';
import { v4 as uuidV4 } from 'uuid';
import { BadRequestError } from 'routing-controllers';


@injectable()
export class UserRepository {
    async list({ filters, pagination }: DefaultListUseCaseType<Partial<UserEntity>>) {
        const skip = pagination.page * pagination.size;
        const take = pagination.size;
        const [data, total] = await UserEntity.findAndCount({
            skip,
            take
        });
        return { data, total}
    }

    createUser({ data }: DefaultCreateUseCaseType<UserEntity>) {
        if (!data) return;
        return UserEntity.save({ ...data, id: uuidV4() } as UserEntity);
    }

    findById({ filters }: DefaultFilterUseCaseType<{ id: string; }>) {
        if (!filters || !filters.id) {
            throw new BadRequestError('id is not defined');
        }
        return UserEntity.findOne({
            where: { id: filters.id }
        });
    }

    getUserNameByCompanyId({ filters }: DefaultFilterUseCaseType<{ companyId: string; username: string; }>) {
        return UserEntity.findOne({
            where: {
                companyId: filters?.companyId,
                username: filters?.username
            }
        });
    }

    getUserByName({ filters }: DefaultFilterUseCaseType<{ username: string; }>) {
        return UserEntity.findOne({
            where: {
                username: filters?.username
            }
        });
    }
}
