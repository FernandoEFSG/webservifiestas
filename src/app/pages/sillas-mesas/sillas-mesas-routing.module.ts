import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SillasMesasComponent } from './sillas-mesas.component';
const routes: Routes = [
  { path: '', component: SillasMesasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SillasMesasRoutingModule { }
