import {Action} from "../action/action";
import {Program} from "../program";
import {LFunction} from "../function/function";

export class Instance{
  _id : String;
  _program : String;
  ActionIDs : String[];
  Actions : Action[];
  Program : Program;
  FunctionIDs : String[];
  Functions : LFunction[];


  constructor(data :any){
    this._id = data._id;
    this._program = data._program;
    let tmp : Action[] = [];
    this.Actions = tmp;
    this.Program = data.Program;
    this.ActionIDs = [];
    for(var i = 0 ; i < data.Actions.length;i++){
      this.ActionIDs.push(data.Actions[i]);
    }

    let funTmp : LFunction[] = [];
    this.Functions = funTmp;
    this.FunctionIDs = [];
    for(var i = 0; i < data.Functions.length;i++){
      this.FunctionIDs.push(data.Functions[i]);
    }
  }

  actionExists(ac : Action) : boolean{
    for(var i = 0; i < this.Actions.length;i++){
      if(this.Actions[i].TimeCreated == ac.TimeCreated &&
        this.Actions[i].Type == ac.Type){
        return true;
      }
    }
    return false
  }

  addAction(data : any, callback : Function){
    var action = new Action(data);
    if(this.actionExists(action))return;
    this.Actions.push(action);
    callback(action);
  }

  functionExists(fun : LFunction) : boolean{
    for(var i = 0 ; i < this.Functions.length;i++){
      if(this.Functions[i].Name == fun.Name) return true;
    }
    return false;
  }

  addFunction(data : any, callback : Function){
    var fun = new LFunction(data);
    if(!this.functionExists(fun)){
      this.Functions.push(fun);
      callback(fun);
    }
    callback(null);
  }


  getNumberOfStates() : number{
    var total = 0;
    for(var i = 0; i < this.Actions.length;i++){
      total += this.Actions[i].Data.StateIDs.length;
    }
    return total;
  }

  getEndTime() : number{
    var startTime : Date;
    var endTime : Date;
    var endTimeFound = false;
    for(var i = 0; i < this.Actions.length;i++){
      var action = this.Actions[i];
      if(action.Type == "Start"){
        startTime = new Date(action.TimeCreated);
      }
      if(action.Type == "End"){
        endTime = new Date(action.TimeCreated);
        endTimeFound = true;
      }
    }
    if(endTimeFound){
      console.log("Type", typeof endTime);
      return (endTime.getMilliseconds() - startTime.getMilliseconds());
    }
    return -1;
  }

  getEndTimeString() : String{
    var endTime = this.getEndTime();
    if (endTime != -1){
      return endTime.toString() + "ms";
    }
    return "Instance still running";
  }

}
