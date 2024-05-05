import { Authorized, CurrentUser, Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { PaginationSchema } from "../domain/schemas";
import UserEntity from "../domain/entities/user.entity";
import { ValidatePermissionProvider } from "../domain/providers/validate-permission-provider";
import { StrictQueryParams } from "../external/web/validator";
import { LisMessageUseCase } from "../application/use-case/message/list-message-use-case";

@JsonController('/message')
@injectable()
export class  UserController {
    constructor(
        private readonly lisMessageUseCase: LisMessageUseCase,
        private readonly validatePermissionProvider : ValidatePermissionProvider
    ) { }

    @OpenAPI({
        summary: 'List Users',
        description: 'This route list users by user company_id '
    })
    @Get('/list')
    @Authorized()
    list(@StrictQueryParams() pagination: PaginationSchema, @CurrentUser() user: UserEntity) {
        this.validatePermissionProvider.isAdmin(user)
        return this.lisMessageUseCase.execute({ filters: { companyId: user.companyId }, pagination })
    }
}