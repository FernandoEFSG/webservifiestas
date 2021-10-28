import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartarComponent } from './apartar.component';

const routes: Routes = [ 
  { path: '', component: ApartarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartarRoutingModule { }

