import { BaseDto } from './base';

export class Catalogo extends BaseDto {
    public id: number;
    public catalogoId: string;
    public nombre: string;
    public activo: boolean;
}
