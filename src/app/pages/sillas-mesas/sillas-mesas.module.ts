import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SillasMesasRoutingModule } from './sillas-mesas-routing.module';
import { SillasMesasComponent } from './sillas-mesas.component';


@NgModule({
  declarations: [
    SillasMesasComponent
  ],
  imports: [
    CommonModule,
    SillasMesasRoutingModule
  ]
})
export class SillasMesasModule { }
