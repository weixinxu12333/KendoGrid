import { BaseDto } from './base';

export class Clase extends BaseDto {
    public claseAdministracionId: string;
    public subEscalaId: string;
    public nombre: string;
    public uuid: string;
    public created: Date;
    public modified: Date;

}
