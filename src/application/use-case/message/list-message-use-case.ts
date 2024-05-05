import { injectable } from "tsyringe";
import { DefaultListUseCaseType } from "../../types/default-use-case";
import { MessageRepository } from "../../../external/database/repository/message.repository";

@injectable()
export class LisMessageUseCase {
    constructor(private readonly messageRepository: MessageRepository) { }

    execute({ filters, pagination, trx }: DefaultListUseCaseType<any>) {
        return this.messageRepository.list({ filters, pagination, trx })
    }
}