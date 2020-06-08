import { EntityRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository'

@EntityRepository(User)
export default class UserRepository extends Repository<User> implements IUserRepository{}
