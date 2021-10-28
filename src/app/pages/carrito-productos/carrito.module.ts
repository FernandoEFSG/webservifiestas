import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { CarritoComponent } from './carrito.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CarritoComponent],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ]
})
export class CarritoModule { }

