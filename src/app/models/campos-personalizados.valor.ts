import { BaseDto } from './base';

export class CamposPersonalizadosValor extends BaseDto {

    public fieldId: string;
    public relRowId: number;
    public valueField: string | number | Date | boolean;
}

