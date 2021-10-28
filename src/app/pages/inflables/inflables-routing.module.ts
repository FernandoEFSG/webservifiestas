import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InflablesComponent } from './inflables.component';

const routes: Routes = [ 
  { path: '', component: InflablesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InflablesRoutingModule { }

