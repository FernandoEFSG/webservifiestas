import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalizadoRoutingModule } from './trab_personalizado-routing.module';
import { PersonalizadoComponent } from './trab_personalizado.component';


@NgModule({
  declarations: [PersonalizadoComponent],
  imports: [
    CommonModule,
    PersonalizadoRoutingModule
  ]
})
export class PersonalizadoModule { }
