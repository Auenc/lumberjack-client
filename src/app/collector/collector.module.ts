import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule, MdButtonModule, MdCheckboxModule} from '@angular/material';

import {CollectorRoutingModule} from './collector-routing.module';
import { CollectorListComponent } from './collector-list/collector-list.component';
import { CollectorAddComponent } from './collector-add/collector-add.component';

import { CollectorDetailsComponent } from './collector-details/collector-details.component';
import { CollectorEditComponent } from './collector-edit/collector-edit.component';


@NgModule({
  imports: [
    CommonModule,
    CollectorRoutingModule,
    MaterialModule
  ],
  declarations: []
})
export class CollectorModule { }
