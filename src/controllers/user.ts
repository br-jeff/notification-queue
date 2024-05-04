import { Authorized, Get, JsonController, Param, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { StrictBody, StrictQueryParams } from "../external/web/validator";
import { ListUsersUseCase } from "../application/use-case/user/list-users-use-case";
import { PaginationSchema } from "../domain/schemas";
import { CreateUserUseCase } from "../application/use-case/user/create-user-use-case";
import UserEntity from "../domain/entities/user.entity";
import { Transaction } from "typeorm";
import { CreateUserSchema } from "../domain/schemas/create-user.schema";

@JsonController('/user')
@injectable()
export class  UserController {
    constructor(
        private readonly listUsersUseCase: ListUsersUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
    ) { }

    @OpenAPI({
        summary: 'List Users',
        description: 'This route list users by user company_id '
    })
    @Get('/list')
    list(@StrictQueryParams() pagination: PaginationSchema) {
        return this.listUsersUseCase.execute({ pagination })
    }

    @OpenAPI({
        summary: 'List Users',
        description: 'This route list users by user company_id'
    })
    @Post('/create/:companyId')
    create(@Param('companyId') companyId: string, @StrictBody() body: CreateUserSchema, trx: Transaction) {
        const data = {...body, companyId} as UserEntity
        console.log({ data })
        return this.createUserUseCase.execute({ data, trx })
    }
}