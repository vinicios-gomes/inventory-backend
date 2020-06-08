import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
  name: string;
  provider: boolean;
  login: string;
  email: string;
  password: string;
}

export default class CreateUsersService {
  public async execute({
    name,
    login,
    email,
    password,
    provider,
  }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const checkUserExists = await usersRepository.findOne({
      where: { login },
    });

    if (checkUserExists) {
      throw new AppError('Usuario já cadastrado!', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      login,
      password: hashedPassword,
      provider,
    });
    await usersRepository.save(user);
    return user;
  }
}
