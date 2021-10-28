import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonesRoutingModule } from './salones-routing.module';
import { SalonesComponent } from './salones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SalonesComponent],
  imports: [
    CommonModule,
    SalonesRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class SalonesModule { }

