import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosRoutingModule } from './datos-routing.module';
import { DatosComponent } from './datos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DatosComponent
  ],
  imports: [
    CommonModule,
    DatosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DatosModule { }
