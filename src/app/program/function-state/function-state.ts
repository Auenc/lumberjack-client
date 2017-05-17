import {Variable} from "../variable/variable";

export class FunctionState{
  _id : String;
  ID : String;
  Cause : String;
  VariableIDs : String[];
  Variables : Variable[];


  constructor(data : any){
    console.log("Creating state", data);
    this._id = data._id;
    this.Cause = data.Cause;
    this.VariableIDs = data.Variables;
    let tmp : Variable[] = [];
    this.Variables = tmp;
  }

  addVariable(va : any){
    console.log("State-AddVar", va);
    var nva = new Variable(va);
    this.Variables.push(nva);
  }
}
