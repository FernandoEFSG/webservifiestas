import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InflablesRoutingModule } from './inflables-routing.module';
import { InflablesComponent } from './inflables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InflablesComponent],
  imports: [
    CommonModule,
    InflablesRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class InflablesModule { }

