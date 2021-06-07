import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuestoTipo } from '../models/puesto-tipo';

@Injectable({
    providedIn: 'root'
})
export class PuestosService {

    id = '14869';

    constructor(
        private http: HttpClient,
    ) { }

    // get(): Observable<PuestoTipo[]> {
    //     return this.http.get<PuestoTipo[]>(`https://localhost:5001/api/organizacion/organigrama/420/version-puesto?fechaFiltro=2021-05-27`);
    // }

    getAll(): Observable<PuestoTipo[]> {
        return this.http.get<PuestoTipo[]>(`http://localhost:3000/posts`);
    }

    getById(): Observable<PuestoTipo[]> {
        return this.http.get<PuestoTipo[]>(`http://localhost:3000/posts/` + this.id);
    }
}
