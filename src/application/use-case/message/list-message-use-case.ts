import { injectable } from "tsyringe";
import { DefaultListUseCaseType } from "../../types/default-use-case";
import { MessageRepository } from "../../../external/database/repository/message.repository";
import MessageEntity from "../../../domain/entities/message.entity";

@injectable()
export class LisMessageUseCase {
    constructor(private readonly messageRepository: MessageRepository) { }

    execute({ filters, pagination }: DefaultListUseCaseType<Partial<MessageEntity>>) {
        return this.messageRepository.list({ filters, pagination })
    }
}