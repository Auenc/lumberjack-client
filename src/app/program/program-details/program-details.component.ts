import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';

import {ProgramService} from '../program.service';
import {Program} from '../program';
import {InstanceService} from "../../program/instance/instance.service";
import {ActionService} from "../action/action.service";
import {FunctionService} from "../function/function.service";



@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css'],
})
export class ProgramDetailsComponent implements OnInit {

  id: String
  private sub: any;

  program: Program


  constructor(private router: Router, private route: ActivatedRoute,
    private ProgramService: ProgramService,
    public dialog: MdDialog,
    private instanceService: InstanceService, private actionService: ActionService,
    private functionService: FunctionService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getProgram(this.id);
    });
  }

  getProgram(id: String) {
    var self = this;
    this.ProgramService.getProgram(id)
      .then(col => {
        var prog = new Program(col);
        this.program = prog;
        for (var i = 0; i < this.program.InstanceIDs.length; i++) {
          this.instanceService.getInstance(this.program.InstanceIDs[i]).then(ins => {
            this.program.addInstance(ins, function(instance) {
              console.log("compiled Loading instanc");
              //Load in actions
              for (var i = 0; i < instance.ActionIDs.length; i++) {
                console.log("compiled Loading action");
                self.actionService.getAction(instance.ActionIDs[i]).then(ac => {
                  instance.addAction(ac, function(action){

                    self.functionService.getFunction(action.FunctionID).then(fun => {
                      action.setData(fun);
                      self.functionService.getCaller(action.Data.CallerID).then(cal => {
                        action.Data.setCaller(cal);
                        self.loadStructure();
                        prog.compileStructure();
                      });
                    });
                  });
                });
              }


              for(var i = 0; i < instance.FunctionIDs.length;i++){
                self.functionService.getFunction(instance.FunctionIDs[i]).then(fun => {
                  instance.addFunction(fun, function(){

                  });
                });
              }
              //instance.

            });

            });
          }

        });
      }

  loadStructure(){

  }

  confirmDelete() {
    let dialogRef = this.dialog.open(DialogConfirmDelete);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ProgramService.deleteProgram(this.id)
          .then(() => {
            this.router.navigate(['/programs/'])
          })
      }
    });
  }

}

@Component({
  selector: 'delete-result-dialog',
  templateUrl: "./dialog-confirm-delete.component.html"
})
export class DialogConfirmDelete {
  constructor(public dialogRef: MdDialogRef<DialogConfirmDelete>) { }
}
