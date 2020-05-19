import { EntityRepository, Repository } from 'typeorm';

import Collaborator from '../models/Collaborator';

interface RequestDTO {
  name: string;
  matricula: string;
  email: boolean;
  departamento_id: string;
  cargo_id: string;
  user_id: string;
}

@EntityRepository(Collaborator)
export default class CollaboratorRepository extends Repository<Collaborator> {}
