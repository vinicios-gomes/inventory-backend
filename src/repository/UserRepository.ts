import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

interface RequestDTO {
  name: string;
  matricula: string;
  provider: boolean;
  login: string;
  email: string;
  password?: string;
}

@EntityRepository(User)
export default class UserRepository extends Repository<User> {}
