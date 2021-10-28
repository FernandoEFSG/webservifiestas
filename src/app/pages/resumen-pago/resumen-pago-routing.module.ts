import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumenPagoComponent } from './resumen-pago.component';



const routes: Routes = [
  {path: '', component: ResumenPagoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumenPagoRoutingModule { }
