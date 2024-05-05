import { injectable } from "tsyringe";

import { DefaultCreateUseCaseType } from "../../types/default-use-case";
import { EncryptionProvider } from "../../../domain/providers/encryption-provider";
import { BadRequestError } from "routing-controllers";
import UserEntity from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../external/database/repository/user.repository";


@injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptionProvider: EncryptionProvider) { }

    async execute({ data }: DefaultCreateUseCaseType<UserEntity>) {
        const { username, name, companyId, password } = data

        const hasUser = await this.userRepository.getUserNameByCompanyId({
            filters: { 
                username, 
                companyId,
               },
            })

        if (hasUser) {
            throw new BadRequestError('username is already taken')
        }

        const user = {
            username,
            name,
            companyId,
            password: await this.encryptionProvider.createHash(password),

        }

         return this.userRepository.createUser({ data: user})
    }
}