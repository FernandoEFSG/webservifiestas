import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocteleríaRoutingModule } from './coctelería-routing.module';
import { CocteleríaComponent } from './coctelería.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CocteleríaComponent],
  imports: [
    CommonModule,
    CocteleríaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CocteleríaModule { }

