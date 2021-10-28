import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PiñatasComponent } from './piñatas.component';

const routes: Routes = [ 
  { path: '', component: PiñatasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PiñatasRoutingModule { }

