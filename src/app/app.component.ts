import { Component, ViewChild } from '@angular/core';
import { DataBindingDirective, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filter } from 'rxjs/operators';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { PuestosService } from './services/puestosService';
import { PuestoTipo } from './models/puesto-tipo';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { APIService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'gettingStarted';
  @ViewChild(DataBindingDirective)
  dataBinding: DataBindingDirective;

  // Carregant dades
  public loading = true;

  // Dades a mostrar al grid.
  public gridData: GridDataResult = { data: [], total: 0 };

  // Array per emmagatzemar dades rebudes d'API
  public puestosTipo: PuestoTipo[] = [];

  // Ordre
  public sort: SortDescriptor[] = [];

  // Filtre general
  public commonFilter = '';

  // Paginació
  public skip = 0;
  public pageSize = 15;

  public state: State = {
    skip: 0,
    take: 15,
  };

  constructor(
    private oauthService: OAuthService,
    private puestosService: PuestosService,
    private sanitizer: DomSanitizer) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin().then(_ => this.initLoad());

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        this.oauthService.loadUserProfile();
      });

    this.allData = this.allData.bind(this);
  }

  private initLoad(): void {

    this.puestosService.getAll().subscribe(data => {
      this.puestosTipo = data;
      this.refreshData();
      this.loading = false;
    });
  }

  private buildFilter(): State {
    return {
      sort: this.sort,
      skip: this.skip,
      take: this.pageSize
    };
  }

  private refreshData(): void {
    // Fem la primera busqueda per text
    let filtreBusqueda = this.puestosTipo;
    if (this.commonFilter !== null || this.commonFilter.trim() !== '') {
      filtreBusqueda = filtreBusqueda
        .filter(
          // Filtrem els objectes que tenen algun valor de tipus string i que contingui el text buscat
          puestoTipo => Object.values(puestoTipo).filter(
            valor => typeof valor === 'string' && valor.indexOf(this.commonFilter) > -1
          ).length > 0
        );
    }
    console.log(filtreBusqueda);
    console.log(this.commonFilter);
    this.gridData = process(filtreBusqueda, this.state);
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.refreshData();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.refreshData();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.refreshData();
  }

  public onFilter(inputValue: string): void {
    this.commonFilter = inputValue;
    this.refreshData();
  }

  // Funcionario y tal, TP
  public valorCampo = '';

  public changeColorCells(value: string): SafeStyle {
    let result = '';
    try {
      value = value.toString().toLowerCase();
      if (value.indexOf(this.valorCampo.toLowerCase()) >= 0 && this.valorCampo !== '') {
        result = 'rgb(150, 193, 234)';
      }
    } catch (error) { }
    return this.sanitizer.bypassSecurityTrustStyle(result);
  }

  //Excel
  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.puestosTipo,
        {
          sort: [{ field: "puestoId", dir: "asc" }]
        }).data
    };

    return result;
  }



}
