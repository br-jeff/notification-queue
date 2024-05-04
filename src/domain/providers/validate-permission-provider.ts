import UserEntity from '../entities/user.entity'
import { ForbiddenError } from 'routing-controllers'


export class ValidatePermissionProvider {
    validateCompany(user: UserEntity, companyId: string) {
        if(user.companyId !== companyId) {
            throw new ForbiddenError("user do not have Permission")
        }
    }

}