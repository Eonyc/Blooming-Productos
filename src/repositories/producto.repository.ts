import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Producto, ProductoRelations, Marca, Categoria, CategoriaProd, Imagen} from '../models';
import {MarcaRepository} from './marca.repository';
import {CategoriaProdRepository} from './categoria-prod.repository';
import {CategoriaRepository} from './categoria.repository';
import {ImagenRepository} from './imagen.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly marca_pro: BelongsToAccessor<Marca, typeof Producto.prototype.id>;

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          CategoriaProd,
          typeof Producto.prototype.id
        >;

  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('CategoriaProdRepository') protected categoriaProdRepositoryGetter: Getter<CategoriaProdRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>,
  ) {
    super(Producto, dataSource);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, categoriaProdRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
    this.marca_pro = this.createBelongsToAccessorFor('marca_pro', marcaRepositoryGetter,);
    this.registerInclusionResolver('marca_pro', this.marca_pro.inclusionResolver);
  }
}
