import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PiñatasRoutingModule } from './piñatas-routing.module';
import { PiñatasComponent } from './piñatas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    PiñatasComponent
  ],
  imports: [
    CommonModule,
    PiñatasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PiñatasModule { }

