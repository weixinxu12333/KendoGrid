import { Component, Renderer2, ViewChild } from '@angular/core';
import { DataBindingDirective, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filter } from 'rxjs/operators';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, process, State } from '@progress/kendo-data-query';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { PuestosService } from './services/puestosService';
import { PuestoTipo } from './models/puesto-tipo';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'gettingStarted';

  @ViewChild(DataBindingDirective)
  dataBinding: DataBindingDirective;

  public editDataItem: PuestoTipo;
  public isNew: boolean;

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

  // CRUD row
  public editedRowIndex: number;
  public formGroup: FormGroup;
  // public isNew = false;
  @ViewChild(GridComponent, { static: true }) private grid: GridComponent;
  public gridCurrentState: State = this.state;

  public editMode = false;

  // public get isInEditingMode(): boolean {
  //   return this.editedRowIndex !== undefined || this.isNew;
  // }

  // public isTouchScreen: boolean;

  //Mobile
  public mobileMode = false;

  constructor(

    private oauthService: OAuthService,
    private puestosService: PuestosService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
  ) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin().then(_ => this.initLoad());

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        this.oauthService.loadUserProfile();
      });

    this.allData = this.allData.bind(this);
    // this.createFormGroup = this.createFormGroup.bind(this);

    renderer.listen('window', 'resize', () => {
      this.updateMobileMode();
    });
    this.updateMobileMode();

  }

  private updateMobileMode() {
    this.mobileMode = window.matchMedia("(max-width: 576px)").matches;
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

  public dataStateChange(state: State): void {
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

  // CRUD
  // public createFormGroup(dataItem: PuestoTipo): FormGroup {
  //   return this.formGroup = this.formBuilder.group({
  //     'id': new FormControl(),
  //     'nombre': new FormControl()
  //   });
  // }



  public addHandler({ sender }): void {
    // this.closeEditor(sender);
    // this.formGroup = sender.addRow(this.createFormGroup(new PuestoTipo()));
    // sender.addRow(this.formGroup);
    // this.refreshData();

    this.editMode = true;

    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'id': new FormControl(),
      'puestoIdOficial': new FormControl(),
      'nombre': new FormControl('', Validators.required)
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }): void {
    // this.formGroup = new FormGroup({
    //   'id': new FormControl(dataItem.id),
    //   'nombre': new FormControl(dataItem.denominacion),
    // });
    // this.editedRowIndex = rowIndex;

    // sender.editRow(rowIndex, this.formGroup);
    // this.refreshData();
    this.editDataItem = dataItem;
    this.closeEditor(sender);

    this.editMode = true;

    this.formGroup = new FormGroup({
      'id': new FormControl(dataItem.id),
      'puestoIdOficial': new FormControl(dataItem.puestoId),
      'nombre': new FormControl(dataItem.nombre, Validators.required)
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender = undefined, rowIndex = undefined } = {}): void {
    if (sender !== undefined)
      this.closeEditor(sender, rowIndex);
    this.editMode = false;
    this.editDataItem = undefined;
  }
  public save(puesto: PuestoTipo, isNew: boolean): void {

    this.puestosService.save(puesto, isNew);
    this.editDataItem = undefined;
    this.initLoad();
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
    // const puesto: PuestoTipo = formGroup.value;

    // if (isNew) {
    //   this.puestosService.create(puesto).subscribe();
    // } else {
    //   this.puestosService.update(puesto).subscribe();
    // }
    // sender.closeRow(rowIndex);
    // this.refreshData();
    const puesto = formGroup.value;

    sender?.closeRow(rowIndex);

    this.editMode = false;


    this.save(puesto, isNew);
  }

  public removeHandler({ dataItem }): void {
    this.editMode = false;
    this.puestosService.delete(dataItem).subscribe();

    this.initLoad();
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }


}
