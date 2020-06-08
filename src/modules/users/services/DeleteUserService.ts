import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

export default class DeleteUserService {
  public async execute(id: string): Promise<void> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Usuario não encontrado', 400);
    }

    await userRepository.remove(user);
  }
}
