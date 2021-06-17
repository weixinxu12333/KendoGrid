import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DialogModule, DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { GridMenuColumnComponent } from './shared/components/grid/grid-menu-column/grid-menu-column.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { EditFormComponent } from './edit-form/edit-form.component';



@NgModule({
  declarations: [
    AppComponent,
    GridMenuColumnComponent,
    EditFormComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, DialogModule, FormsModule, ReactiveFormsModule, GridModule, InputsModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://localhost:5001'],
        sendAccessToken: true
      }
    }),
    CommonModule,
    MatSliderModule,
    MatIconModule,
    MatTooltipModule,
    ExcelModule,
    MatMenuModule,
    DialogsModule
  ],
  exports: [
    GridMenuColumnComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
