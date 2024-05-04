import { injectable } from "tsyringe";

import { DefaultCreateUseCaseType } from "../../types/default-use-case";
import { EncryptionProvider } from "../../../domain/providers/encryption-provider";
import { BadRequestError } from "routing-controllers";
import { UserRepository } from "../../../external/database/repository/user.repository";
import UserEntity from "../../../domain/entities/user.entity";


@injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptionProvider: EncryptionProvider) { }

    async execute({ data, trx }: DefaultCreateUseCaseType<UserEntity>) {
        const { name, companyId, password } = data
        console.log({ name, companyId })
        const hasUser = await this.userRepository.getUserNameByCompanyId({
            filters: { 
                name, 
                companyId,
               },
            })

            console.log({ hasUser})
        if (hasUser.length) {
            throw new BadRequestError('username is already taken')
        }

        const user = {
            name, 
            companyId,
            password: await this.encryptionProvider.createHash(password),

        }

         return this.userRepository.createUser({ data: user, trx })
    }
}