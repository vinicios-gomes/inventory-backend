import { getCustomRepository } from 'typeorm';
import CollaboratorRepository from '../repository/CollaboratorRepository';
import Collaborator from '../models/Collaborator';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  matricula: number;
  email: string;
  departamento_id: string;
  cargo_id: string;
  user_id: string;
}

export default class CreateCollaboratorService {
  public async execute({
    name,
    matricula,
    email,
    cargo_id,
    departamento_id,
    user_id,
  }: RequestDTO): Promise<Collaborator> {
    const collaboratorRepository = getCustomRepository(CollaboratorRepository);

    const collabExist = await collaboratorRepository.findOne({
      where: { matricula },
    });

    if (collabExist) {
      throw new AppError(
        `Esta matricula já pertence ao funcionario ${(await collabExist).name}`,
        401,
      );
    }

    const collaborator = collaboratorRepository.create({
      name,
      matricula,
      email,
      departamento_id,
      cargo_id,
      user_id,
    });

    await collaboratorRepository.save(collaborator);

    return collaborator;
  }
}
