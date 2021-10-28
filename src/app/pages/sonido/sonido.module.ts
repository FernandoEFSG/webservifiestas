import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SonidoRoutingModule } from './sonido-routing.module';
import { SonidoComponent } from './sonido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SonidoComponent],
  imports: [
    CommonModule,
    SonidoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SonidoModule { }

