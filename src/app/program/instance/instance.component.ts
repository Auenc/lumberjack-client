import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Instance} from "./instance";
import {InstanceService} from "./instance.service";
import {ProgramService} from "../program.service";
import {ActionService} from "../action/action.service";
import {FunctionService} from "../function/function.service";

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.css']
})
export class InstanceComponent implements OnInit {

  id: String
  private sub: any;

  instance: Instance;

  constructor(private router: Router, private route: ActivatedRoute, private instanceService: InstanceService,
    private programService: ProgramService, private actionService : ActionService,
  private functionService : FunctionService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getInstance(this.id);
    });
  }

  loadStructure(){

  }

  getInstance(id: String) {
    this.instanceService.getInstance(id)
      .then(ins => {
        var program;
        this.programService.getProgram(ins._program).then(prog => {
          ins.Program = prog;

          this.instance = new Instance(ins);
          for (var i = 0; i < this.instance.ActionIDs.length; i++) {
            this.actionService.getAction(this.instance.ActionIDs[i])
            .then(ac => {
              var self = this;
                this.instance.addAction(ac, function(action){
                  //Get function from ac.data
                  self.functionService.getFunction(action.FunctionID).then(fun => {
                      action.setData(fun);
                      self.functionService.getCaller(action.Data.CallerID).then(cal => {
                        action.Data.setCaller(cal);
                        self.loadStructure();
                      });
                  });
                });


                console.log("Instance added", ac);
            });
          }

          console.log("Adding functions", this.instance.FunctionIDs);
          for(var i = 0; i < this.instance.FunctionIDs.length;i++){
            console.log("adding function starting")
            this.functionService.getFunction(this.instance.FunctionIDs[i]).then(fun => {
              this.instance.addFunction(fun, function(a){
                
              });
            });
          }
          console.log("Finished adding", this.instance);
        });

      });
  }

}
