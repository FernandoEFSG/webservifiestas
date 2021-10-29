import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonesRoutingModule } from './salones-routing.module';
import { SalonesComponent } from './salones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [SalonesComponent],
  imports: [
    CommonModule,
    SalonesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ]
})
export class SalonesModule { }

