import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuestoTipo } from '../models/puesto-tipo';

@Injectable({
    providedIn: 'root'
})
export class PuestosService {

    constructor(
        private http: HttpClient,
    ) { }

    // getAll(): Observable<PuestoTipo[]> {
    //     return this.http.get<PuestoTipo[]>(`https://localhost:5001/api/organizacion/organigrama/420/version-puesto?fechaFiltro=2021-05-27`);
    // }

    getAll(): Observable<PuestoTipo[]> {
        return this.http.get<PuestoTipo[]>(`http://localhost:3000/posts`);
    }

    getById(id: number): Observable<PuestoTipo[]> {
        return this.http.get<PuestoTipo[]>(`http://localhost:3000/posts/${id}`);
    }

    create(puesto: PuestoTipo): Observable<PuestoTipo> {
        return this.http.post<PuestoTipo>(`http://localhost:3000/posts`, { ...puesto, id: null });
    }

    update(puesto: PuestoTipo): Observable<PuestoTipo> {
        return this.http.put<PuestoTipo>(`http://localhost:3000/posts/${puesto.id}`, puesto);
    }

    delete(puesto: PuestoTipo): Observable<PuestoTipo> {
        return this.http.delete<PuestoTipo>(`http://localhost:3000/posts/${puesto.id}`);
    }
}
