import { EntityRepository, Repository } from 'typeorm';

import Collaborator from '@modules/collaborators/infra/typeorm/entities/Collaborator';
import ICollaboratorRepository from '@modules/collaborators/repositories/ICollaboratorRepository'

import AppError from '@shared/errors/AppError'

@EntityRepository(Collaborator)
export default class CollaboratorRepository extends Repository<Collaborator> implements ICollaboratorRepository {
  public async findByMat(matricula: string){
    const findCollaborator = await this.findOne({
      where: {matricula}
    });

    if(!findCollaborator){
      throw new AppError('Não há colaborador cadastrado com essa matricula', 400);
    }

    return findCollaborator;
  }
}
