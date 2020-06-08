import { EntityRepository, Repository } from 'typeorm';

import Assign from '@modules/equipment/infra/typeorm/entities/Assign';
import IAssignRepository from '@modules/equipment/repositories/IAssignRepository'

@EntityRepository(Assign)
export default class UserRepository extends Repository<Assign> implements IAssignRepository {}
