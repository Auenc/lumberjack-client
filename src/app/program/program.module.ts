import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { ProgramAddComponent } from './program-add/program-add.component';
import { ProgramEditComponent } from './program-edit/program-edit.component';

import {ProgramRoutingModule} from './program-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule
  ],
  declarations: []
})
export class ProgramModule { }
