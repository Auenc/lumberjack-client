import {FunctionState} from "../function-state/function-state";
import {Variable} from "../variable/variable";

export class LFunction{
  _id : String;
  ID : String;
  Name : String;
  Caller : LFunction;
  CallerID : String;
  Calls : LFunction[];
  StateIDs : String[];
  States : FunctionState[];
  ReturnValues : Variable[];

  constructor(data : any){
    let tmp : FunctionState[] = [];
    this.States = tmp;
    if(data == null)return;
    this._id = data._id;
    this.CallerID = data.CallerID;
    this.ID = data.ID;
    this.Name = data.Name;
    this.StateIDs = data.States;

  }

  setCaller(data : any){
    console.log("Set caller", data);
    this.Caller = new LFunction(data);
  }

  addCall(data : any){

  }

  addState(data : any, callback : Function){
    var state = new FunctionState(data);
    this.States.push(state);
    callback(state);
  }


  addReturnValue(data : any){

  }

}
