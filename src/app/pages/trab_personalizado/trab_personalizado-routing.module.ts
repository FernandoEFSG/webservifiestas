import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalizadoComponent } from './trab_personalizado.component';

const routes: Routes = [ 
  { path: '', component: PersonalizadoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalizadoRoutingModule { }
