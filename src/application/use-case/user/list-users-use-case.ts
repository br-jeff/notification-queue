import { injectable } from "tsyringe";
import { DefaultListUseCaseType } from "../../types/default-use-case";
import { UserRepository } from "../../../external/database/repository/user.repository";

@injectable()
export class ListUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    execute({ filters, pagination, trx }: DefaultListUseCaseType<any>) {
        return this.userRepository.list({ filters, pagination, trx })
    }
}