import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramAddComponent } from './program-add/program-add.component';
import {ProgramEditComponent} from './program-edit/program-edit.component';
import { ProgramDetailsComponent, DialogConfirmDelete } from './program-details/program-details.component';


import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const ProgramRoutes = [
  { path: 'programs', component : ProgramListComponent},
  { path: 'programs/add', component : ProgramAddComponent},
  { path : 'programs/:id', component : ProgramDetailsComponent},
  { path : 'programs/edit/:id', component : ProgramEditComponent}
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
    RouterModule
  ],
  declarations: [ProgramEditComponent, ProgramListComponent, ProgramAddComponent, ProgramDetailsComponent, DialogConfirmDelete],
  bootstrap : [ProgramDetailsComponent, DialogConfirmDelete]
})
export class ProgramRoutingModule { }
