import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenPagoRoutingModule } from './resumen-pago-routing.module';
import { ResumenPagoComponent } from './resumen-pago.component';


@NgModule({
  declarations: [
    ResumenPagoComponent
  ],
  imports: [
    CommonModule,
    ResumenPagoRoutingModule
  ]
})
export class ResumenPagoModule { }
