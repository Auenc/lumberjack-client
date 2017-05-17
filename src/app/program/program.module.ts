import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { ProgramAddComponent } from './program-add/program-add.component';
import { ProgramEditComponent } from './program-edit/program-edit.component';

import {ProgramRoutingModule} from './program-routing.module';
import { InstanceComponent } from './instance/instance.component';
import { FunctionComponent } from './function/function.component';
import { FunctionStateComponent } from './function-state/function-state.component';
import { VariableComponent } from './variable/variable.component';
import { ActionComponent } from './action/action.component';
import { SortActionByTimePipe } from './action/sort-action-by-time.pipe';

@NgModule({
  imports: [
    CommonModule,
    ProgramRoutingModule
  ],
  declarations: []
})
export class ProgramModule { }
