import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CollectorListComponent } from './collector-list/collector-list.component';
import { CollectorAddComponent } from './collector-add/collector-add.component';
import {CollectorEditComponent} from './collector-edit/collector-edit.component';
import { CollectorDetailsComponent, DialogConfirmDelete } from './collector-details/collector-details.component';


import {MaterialModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const collectorRoutes = [
  { path: 'collectors', component : CollectorListComponent},
  { path: 'collectors/add', component : CollectorAddComponent},
  { path : 'collectors/:id', component : CollectorDetailsComponent},
  { path : 'collectors/edit/:id', component : CollectorEditComponent}
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(collectorRoutes),
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [CollectorEditComponent, CollectorListComponent, CollectorAddComponent, CollectorDetailsComponent, DialogConfirmDelete],
  bootstrap : [CollectorDetailsComponent, DialogConfirmDelete]
})
export class CollectorRoutingModule { }
