import { Authorized, Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { StrictQueryParams } from "../external/web/validator";
import { ListUsersUseCase } from "../application/use-case/user/list-users-use-case";
import { PaginationSchema } from "../domain/schemas";

@JsonController('/user')
@injectable()
export class  UserController {
    constructor(
        private readonly listUsersUseCase: ListUsersUseCase,
    ) { }

    @OpenAPI({
        summary: 'List Users',
        description: 'This route list users by user company_id '
    })
    @Get('/list')
    list(@StrictQueryParams() pagination: PaginationSchema) {
        return this.listUsersUseCase.execute({ pagination })
    }
}