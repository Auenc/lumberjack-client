export class Variable{
  Name : String;
  Value : String;
  Type : String;
  Description : String;
  _id : String;

  constructor(data : any){
    this._id = data._id;
    this.Value = data.Value;
    this.Name = data.Name;
    this.Type = data.Type;
    this.Description = data.Description;
  }

}
