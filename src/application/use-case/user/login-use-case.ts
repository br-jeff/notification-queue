import { injectable } from "tsyringe";
import { GenericUseCaseType } from "../../types/default-use-case";
import { EncryptionProvider } from "../../../domain/providers/encryption-provider";
import { BadRequestError, UnauthorizedError } from "routing-controllers";
import { JWTProvider } from "../../../domain/providers/jwt-provider";
import { UserRepository } from "../../../external/database/repository/user.repository";

type Data = {
  username: string;
  password: string;
}

@injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionProvider: EncryptionProvider,
    private readonly tokenProvider: JWTProvider
  ) { }

  async execute({ data }: GenericUseCaseType<Data>) {
    try {
      const user = await this.userRepository.getUserByName({ filters: { username: data.username } })

      if(!user) {
        throw new BadRequestError('User not found')
      }

      const validation = await this.encryptionProvider.verify(data.password, user.password)
      if (!validation) throw new UnauthorizedError()

      return {
        acessToken: this.tokenProvider.createAcessToken({
          id: user.id,
          username: user.name,
          companyId: user.companyId
        })
      }
    } catch (err) {
      throw new UnauthorizedError()
    }
  }



}