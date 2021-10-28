import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartarRoutingModule } from './apartar-routing.module';
import { ApartarComponent } from './apartar.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ApartarComponent],
  imports: [
    CommonModule,
    ApartarRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApartarModule { }

