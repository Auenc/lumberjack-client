import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProgramListComponent } from './program-list/program-list.component';
import { FunctionStateComponent } from './function-state/function-state.component';
import { FunctionComponent } from './function/function.component';
import { ActionComponent } from './action/action.component';
import { InstanceComponent } from './instance/instance.component';
import { VariableComponent } from './variable/variable.component';
import { ProgramAddComponent } from './program-add/program-add.component';
import {ProgramEditComponent} from './program-edit/program-edit.component';
import { ProgramDetailsComponent, DialogConfirmDelete } from './program-details/program-details.component';
import { SortActionByTimePipe } from './action/sort-action-by-time.pipe';


import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const ProgramRoutes = [
  { path: 'programs/instance/:id', component : InstanceComponent},
  { path: 'programs/function/:id', component : FunctionComponent},
  { path: 'programs/functionstate', component : FunctionStateComponent},
  { path: 'programs/variable/:id', component : VariableComponent},
  { path: 'programs', component : ProgramListComponent},
  { path: 'programs/add', component : ProgramAddComponent},
  { path : 'programs/:id', component : ProgramDetailsComponent},
  { path : 'programs/edit/:id', component : ProgramEditComponent},

]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProgramRoutes),
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [
    RouterModule,
    SortActionByTimePipe
  ],
  declarations: [SortActionByTimePipe, InstanceComponent, FunctionComponent, FunctionStateComponent, VariableComponent, ActionComponent, ProgramEditComponent, ProgramListComponent, ProgramAddComponent, ProgramDetailsComponent, DialogConfirmDelete],
  bootstrap : [ProgramDetailsComponent, DialogConfirmDelete]
})
export class ProgramRoutingModule { }
