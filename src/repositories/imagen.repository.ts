import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Imagen, ImagenRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype.id,
  ImagenRelations
> {

  public readonly para_producto: BelongsToAccessor<Producto, typeof Imagen.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Imagen, dataSource);
    this.para_producto = this.createBelongsToAccessorFor('para_producto', productoRepositoryGetter,);
    this.registerInclusionResolver('para_producto', this.para_producto.inclusionResolver);
  }
}
