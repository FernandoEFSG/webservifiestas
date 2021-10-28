import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RecoveryComponent],
  imports: [
    CommonModule,
    RecoveryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecoveryModule { }
