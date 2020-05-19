import { EntityRepository, Repository } from 'typeorm';

import Assign from '../models/Assign';

interface RequestDTO {
  name: string;
  matricula: string;
  provider: boolean;
  login: string;
  email: string;
  password?: string;
}

@EntityRepository(Assign)
export default class UserRepository extends Repository<Assign> {}
