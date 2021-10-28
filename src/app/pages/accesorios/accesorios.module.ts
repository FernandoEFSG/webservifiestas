import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesoriosRoutingModule } from './accesorios-routing.module';
import { AccesoriosComponent } from './accesorios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AccesoriosComponent],
  imports: [
    CommonModule,
    AccesoriosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AccesoriosModule { }

