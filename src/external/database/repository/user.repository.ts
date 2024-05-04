import { injectable } from 'tsyringe'
import { DefaultCreateUseCaseType, DefaultFilterUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case'
import UserEntity  from '../../../domain/entities/user.entity'
import { v4 as uuidV4 } from 'uuid'

@injectable()
export class UserRepository {
    async list({ filters, pagination, trx }: DefaultListUseCaseType<UserEntity>) {
        const skip = pagination.page
        const take = pagination.size
        return UserEntity.findAndCount({
            skip,
            take
        })
    }

    createUser({ data, trx }: DefaultCreateUseCaseType<UserEntity>) {
        if(!data) return
        return UserEntity.save({...data, id: uuidV4() } as UserEntity)
    }

    getUserNameByCompanyId({ filters, trx }: DefaultFilterUseCaseType<{ companyId: string, name: string }>) {
        return UserEntity.find({
           where: {
            companyId: filters?.companyId,
            name: filters?.name
           } 
        })
    }
} 