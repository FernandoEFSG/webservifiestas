import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SonidoRoutingModule } from './sonido-routing.module';
import { SonidoComponent } from './sonido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [SonidoComponent],
  imports: [
    CommonModule,
    SonidoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SonidoModule { }

