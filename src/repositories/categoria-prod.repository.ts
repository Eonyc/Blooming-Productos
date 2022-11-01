import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {CategoriaProd, CategoriaProdRelations} from '../models';

export class CategoriaProdRepository extends DefaultCrudRepository<
  CategoriaProd,
  typeof CategoriaProd.prototype.id,
  CategoriaProdRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(CategoriaProd, dataSource);
  }
}
