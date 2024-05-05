import { Authorized, CurrentUser, Get, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { PaginationSchema } from "../domain/schemas";
import UserEntity from "../domain/entities/user.entity";
import { ValidatePermissionProvider } from "../domain/providers/validate-permission-provider";
import { StrictBody, StrictQueryParams } from "../external/web/validator";
import { LisMessageUseCase } from "../application/use-case/message/list-message-use-case";
import { SendMessageUseCase } from "../application/use-case/message/send-message-use-case";
import { SendMessageSchema } from "../domain/schemas/send-message.schema";

@JsonController('/message')
@injectable()
export class  UserController {
    constructor(
        private readonly lisMessageUseCase: LisMessageUseCase,
        private readonly validatePermissionProvider : ValidatePermissionProvider,
        private readonly sendMessageUseCase: SendMessageUseCase,
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


    @Post('/send')
    @Authorized()
    async send(@CurrentUser() user: UserEntity, @StrictBody() body: SendMessageSchema) {
     this.validatePermissionProvider.isAdmin(user)
     return this.sendMessageUseCase.execute({ data: body, user })
    }
}