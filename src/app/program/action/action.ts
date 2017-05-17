import {LFunction} from "../function/function";

export class Action {
  _id: String;
  ID: String;
  Type: String;
  Invoker: String;
  FunctionID: String;
  Data: LFunction;
  TimeCreated: Date;

  constructor(data: any) {
    console.log("Creating action", data);
    this._id = data._id;
    this.ID = data.ID;
    this.Type = data.Type;
    this.FunctionID = data.Data;
    this.TimeCreated = data.TimeCreated;
  }

  setData(data: any) {
    var fun = new LFunction(data);
    this.Data = fun;
  }

  print(): String {
    let print: String = "A Action";
    if (this.Data == null) return print;
    switch (this.Type) {
      case "Call":
        var fName = this.Data.Caller.Name == null || this.Data.Caller.Name == undefined  ? "" : this.Data.Caller.Name;
        var mid = fName == "" ? "Call " : " Calls ";
        print = fName + mid + this.Data.Name;
        break;
      case "Return":
        print = this.Data.Name + " Returns " + this.Data.Caller.Name;
        break;
      case "Start":
        print = "Start";
        break;
      case "End":
        print = "End";
        break;
    }

    return print;
  }

  getFunctionId(): String {
    if (this.Data == null) return "";
    return this.Data._id;
  }

}
