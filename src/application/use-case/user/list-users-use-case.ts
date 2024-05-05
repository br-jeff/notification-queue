import { injectable } from "tsyringe";
import { DefaultListUseCaseType } from "../../types/default-use-case";
import { UserRepository } from "../../../external/database/repository/user.repository";
import UserEntity from "../../../domain/entities/user.entity";

@injectable()
export class ListUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    execute({ filters, pagination }: DefaultListUseCaseType<Partial<UserEntity>>) {
        return this.userRepository.list({ filters, pagination})
    }
}