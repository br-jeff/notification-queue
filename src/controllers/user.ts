import { Authorized, CurrentUser, Get, JsonController, Param, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { ArraySerializer, Serializer, StrictBody, StrictQueryParams } from "../external/web/validator";
import { ListUsersUseCase } from "../application/use-case/user/list-users-use-case";
import { PaginationSchema } from "../domain/schemas";
import { CreateUserUseCase } from "../application/use-case/user/create-user-use-case";
import UserEntity from "../domain/entities/user.entity";
import { Transaction } from "typeorm";
import { CreateUserSchema } from "../domain/schemas/create-user.schema";
import { LoginUseCase } from "../application/use-case/user/login-use-case";
import { LoginSchema } from "../domain/schemas/login-schema";
import { ValidatePermissionProvider } from "../domain/providers/validate-permission-provider";
import { UserSerializer } from "../domain/serializers/user-serializer";

@JsonController('/user')
@injectable()
export class  UserController {

    constructor(
        private readonly listUsersUseCase: ListUsersUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly validatePermissionProvider : ValidatePermissionProvider
    ) { }

    @OpenAPI({
        summary: 'List Users',
        description: 'This route list users by user company_id '
    })
    @Get('/list')
    @Authorized()
    @ArraySerializer(UserSerializer)
    list(@StrictQueryParams() pagination: PaginationSchema, @CurrentUser() user: UserEntity) {
        return this.listUsersUseCase.execute({ filters: { companyId: user.companyId }, pagination })
    }

    @OpenAPI({
        summary: 'Create Users',
        description: 'This route list users by user company_id'
    })
    @Post('/create/:companyId')
    @Serializer(UserSerializer)
    create(@Param('companyId') companyId: string, @StrictBody() body: CreateUserSchema, trx: Transaction) {
        const data = {...body, companyId} as UserEntity
        return this.createUserUseCase.execute({ data, trx })
    }

    @OpenAPI({
        summary: 'Login',
        description: 'Login route'
    })
    @Post('/login')
    login(@StrictBody() data: LoginSchema) {
        return this.loginUseCase.execute({ data })
    }
}