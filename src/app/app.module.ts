import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import {HttpClientModule} from "@angular/common/http";
import { TableComponent } from './table/table.component';
import { BindingTableArrayComponent } from './binding-table-array/binding-table-array.component';
import { ImgUnderComponent } from './img-under/img-under.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    TableComponent,
    BindingTableArrayComponent,
    ImgUnderComponent
  ],
  imports: [
    BrowserModule,
		HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
