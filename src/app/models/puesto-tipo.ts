import { Adscripcion } from './adscripcion';
import { BaseDto } from './base';
import { CamposPersonalizadosValor } from './campos-personalizados.valor';
import { Catalogo } from './catalogo';
import { Clase } from './clase';
import { Cuerpo } from './cuerpo';
import { Escala } from './escala';
import { FormaProvision } from './forma-provision';
import { SubEscala } from './subescala';
import { TipoVinculo } from './tipo-vinculo';

// export class PuestoTipo extends BaseDto {
export class PuestoTipo {
    // public adscripcion: Adscripcion;
    // public camino: string;
    // public catalogo: Catalogo;
    // public clase: Clase;
    // public complementoDestinoId: number;
    // public complementoDestinoImporte: number;
    // public complementoEspecificoId: string;
    // public complementoEspecificoImporte: number;
    // public cuerpo: Cuerpo;
    // public disponibilidadPlena: boolean;
    // public dotaciones = 0;
    // public escala: Escala;
    // public formaProvision: FormaProvision;
    // public grupo1Id: string;
    // public grupo2Id: string;
    // public nombre: string;
    // public personaDeConfianza: boolean;
    // public puestoTipoId: string;
    // public reservadoNacionales: boolean;
    // public retribucion: number;
    // public retribucionAnualGrupo: number;
    // public retribucionExtraDiciembreGrupo: number;
    // public retribucionExtraJunioGrupo: number;
    // public rutaUnidadOrganizativa: [];
    // public singularizado: boolean;
    // public subEscala: SubEscala;
    // public tipoVinculo: TipoVinculo;
    // public versionPuestoId: string;
    // public idUnidadOrganizativa: number;
    // public customFieldValue?: CamposPersonalizadosValor[];

    // public puestoId: string;
    // public puestoIdOficial: string;
    public id: string;
    public puestoIdOficial: string;
    public nombre: string;
}
