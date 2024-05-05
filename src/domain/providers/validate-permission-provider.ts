import UserEntity from '../entities/user.entity'
import { ForbiddenError } from 'routing-controllers'


export class ValidatePermissionProvider {
    validateCompany(user: UserEntity, companyId: string) {
        if(user.companyId !== companyId) {
            throw new ForbiddenError("user do not have Permission")
        }
    }

    isAdmin(user: UserEntity) {
        if(user.isAdmin !== true) {
            throw new ForbiddenError("User is not admin")
        }
    }

}