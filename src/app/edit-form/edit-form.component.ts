import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PuestoTipo } from '../models/puesto-tipo';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  public active = false;
  public editForm: FormGroup = new FormGroup({
    'id': new FormControl(),
    'puestoIdOficial': new FormControl('', Validators.required),
    'nombre': new FormControl('', Validators.required)
  });

  @Input() public isNew = false;
  @Input() public set model(puesto: PuestoTipo) {
    console.log('Puesto!!!', puesto);
    this.editForm.reset(puesto);
    this.active = puesto !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<PuestoTipo> = new EventEmitter();

  public onSave(e): void {
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }

  public onCancel(e): void {
    e.preventDefault();
    this.closeForm(e);
  }

  public closeForm(e): void {
    this.active = false;
    this.cancel.emit(e);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
