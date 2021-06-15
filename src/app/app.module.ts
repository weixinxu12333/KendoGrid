import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { GridMenuColumnComponent } from './shared/components/grid/grid-menu-column/grid-menu-column.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    GridMenuColumnComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, GridModule,
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
    MatMenuModule
  ],
  exports: [
    GridMenuColumnComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
