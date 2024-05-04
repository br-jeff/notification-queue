import { injectable } from 'tsyringe'
import { DefaultListUseCaseType } from '../../../application/types/default-use-case'
import UserEntity  from '../../../domain/entities/user.entity'

@injectable()
export class UserRepository {
    async list({ filters, pagination, trx }: DefaultListUseCaseType<any>) {
        const skip = pagination.page
        const take = pagination.size
        return UserEntity.findAndCount({
            skip,
            take
        })
    }
}