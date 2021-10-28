import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SonidoComponent } from './sonido.component';

const routes: Routes = [ 
  { path: '', component: SonidoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SonidoRoutingModule { }

