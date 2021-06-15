// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { PuestoTipo } from '../models/puesto-tipo';

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';
import { PuestoTipo } from '../models/puesto-tipo';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class PuestosService extends BehaviorSubject<any[]> {

    constructor(private http: HttpClient) {
        super([]);
    }

    // getAll(): Observable<PuestoTipo[]> {
    //     return this.http.get<PuestoTipo[]>(`https://localhost:5001/api/organizacion/organigrama/420/version-puesto?fechaFiltro=2021-05-27`);
    // }

    // getAll(): Observable<PuestoTipo[]> {
    //     return this.http.get<PuestoTipo[]>(`http://localhost:3000/posts`);
    // }

    // getById(id: number): Observable<PuestoTipo[]> {
    //     return this.http.get<PuestoTipo[]>(`http://localhost:3000/posts/${id}`);
    // }

    // create(puesto: PuestoTipo): Observable<PuestoTipo> {
    //     return this.http.post<PuestoTipo>(`http://localhost:3000/posts`, { ...puesto, id: null });
    // }

    // update(puesto: PuestoTipo): Observable<PuestoTipo> {
    //     return this.http.put<PuestoTipo>(`http://localhost:3000/posts/${puesto.id}`, puesto);
    // }

    // delete(puesto: PuestoTipo): Observable<PuestoTipo> {
    //     return this.http.delete<PuestoTipo>(`http://localhost:3000/posts/${puesto.id}`);
    // }

    private data: any[] = [];

    public read(): void {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.getAll()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });

    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        // this.fetch(action, data)
        //     .subscribe(() => this.read(), () => this.read());

        this.create(action, data)
            .subscribe(
                () => this.read(),
                () => this.read()
            );
    }

    public remove(data: any) {
        this.reset();

        this.delete(data)
            .subscribe(
                () => this.read(),
                () => this.read()
            );
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

        // revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

    private reset() {
        this.data = [];
    }

    public create(action: string = '', puesto: PuestoTipo): Observable<PuestoTipo> {
        if (action === CREATE_ACTION) {
            console.log(action);
            return this.http.post<PuestoTipo>(`http://localhost:3000/posts`, { ...puesto, id: null });
        }
        else if (action === UPDATE_ACTION) {
            console.log(action);
            return this.http.put<PuestoTipo>(`http://localhost:3000/posts/${puesto.id}`, puesto);
        }
    }

    public delete(puesto: PuestoTipo): Observable<PuestoTipo> {
        return this.http.delete<PuestoTipo>(`http://localhost:3000/posts/${puesto.id}`);
    }

    public getAll(): Observable<PuestoTipo[]> {
        return this.http.get<PuestoTipo[]>(`http://localhost:3000/posts`);
    }
}
