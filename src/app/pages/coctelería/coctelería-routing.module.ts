import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocteleríaComponent } from './coctelería.component';

const routes: Routes = [ 
  { path: '', component: CocteleríaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocteleríaRoutingModule { }

