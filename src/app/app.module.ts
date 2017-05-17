import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

import {MaterialModule, MdButtonModule, MdCheckboxModule, MdCard} from '@angular/material';
import 'hammerjs';

import { CollectorModule } from './collector/collector.module';
import {CollectorService} from './collector/collector.service';

import {ProgramModule} from './program/program.module';
import {ProgramService} from './program/program.service';

import {InstanceService} from "./program/instance/instance.service";
import {ActionService} from "./program/action/action.service";
import {FunctionService} from "./program/function/function.service";
import {VariableService} from "./program/variable/variable.service";
import {FunctionStateService} from "./program/function-state/function-state.service";
import {AppRouterModule} from './app-router/app-router.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdButtonModule,
    MdCheckboxModule,
    CollectorModule,
    ProgramModule,
    AppRouterModule
  ],
  exports : [
    MaterialModule,
    MdButtonModule,
    MdCheckboxModule
  ],
  providers: [CollectorService, ProgramService, InstanceService,
     ActionService, FunctionService, VariableService, FunctionStateService],
  bootstrap: [AppComponent],
})
export class AppModule { }
