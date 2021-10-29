import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SillasMesasRoutingModule } from './sillas-mesas-routing.module';
import { SillasMesasComponent } from './sillas-mesas.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    SillasMesasComponent
  ],
  imports: [
    CommonModule,
    SillasMesasRoutingModule,
    NgxPaginationModule
  ]
})
export class SillasMesasModule { }
