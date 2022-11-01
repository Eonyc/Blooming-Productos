import {Entity, model, property} from '@loopback/repository';

@model()
export class CategoriaProd extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id_producto?: number;

  @property({
    type: 'number',
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id_categoria?: number;

  constructor(data?: Partial<CategoriaProd>) {
    super(data);
  }
}

export interface CategoriaProdRelations {
  // describe navigational properties here
}

export type CategoriaProdWithRelations = CategoriaProd & CategoriaProdRelations;
