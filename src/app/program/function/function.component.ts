import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {InstanceService} from "../instance/instance.service";
import {ActionService} from "../action/action.service";
import {FunctionService} from "./function.service";
import {FunctionStateService} from "../function-state/function-state.service";
import {VariableService} from "../variable/variable.service";
import {Variable} from "../variable/variable";
import {LFunction} from "./function";
import {FunctionState} from "../function-state/function-state";

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  id: String
  private sub: any;

  function: LFunction;

  constructor(private router: Router, private route: ActivatedRoute,
    private actionService: ActionService,
    private functionService: FunctionService,
    private functionStateService: FunctionStateService,
    private variableService : VariableService) { }

  ngOnInit() {
    this.function = new LFunction(null);
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getFunction(this.id);
    });
  }

  varExists(arr : Variable[], va : Variable) : boolean{
    for(var i = 0; i < arr.length;i++){
      if(va.Name == arr[i].Name && va.Type == arr[i].Type)
      return true;
    }
    return false;
  }

  getVariables() : Variable[]{
    let vars : Variable[] = [];
    if(this.function == null) return vars;
    for(var i = 0; i < this.function.States.length;i++){
      var state = this.function.States[i];
      for(var j = 0 ; j < state.Variables.length;j++){
        if(!this.varExists(vars, state.Variables[j]))
          vars.push(state.Variables[j]);
      }
    }

    return vars;
  }

  getStates() : FunctionState[]{
    let tmp :FunctionState[] = [];
    if(this.function != null){
      return this.function.States;
    }
    return tmp;
  }

  getFunction(id: String) {
    this.functionService.getFunction(id)
      .then(fun => {
        this.function = new LFunction(fun);
        this.functionService.getCaller(fun.CallerID).then(cal => {
          this.function.setCaller(cal);
        });
        for(var i = 0 ; i < this.function.StateIDs.length;i++){
          this.functionStateService.getFunctionState(this.function.StateIDs[i])
          .then(state => {
            var self = this;
            this.function.addState(state, function(state){
              for(var i = 0; i < state.VariableIDs.length;i++){
                self.variableService.getVariable(state.VariableIDs[i]).then(va => {
                  state.addVariable(va);
                });
              }
            });
          })
        }

      });
  }

}
