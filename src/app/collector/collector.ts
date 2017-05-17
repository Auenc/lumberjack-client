import {Instance} from "../program/instance/instance";

export class Collector {

   name : String;
   connected : Boolean;
   token : String;
   _id : String;
   InstanceIDs : String[];
   Instances : Instance[];

   constructor(data : any){
     console.log("Collector con called", data);
     if(data == null)return;
     this._id = data._id;
     this.name = data.name;
     this.token = data.token;
     this.connected = data.connected;
     this.InstanceIDs  = data.Instances;

     let tmp : Instance[] = [];

     this.Instances = tmp;
   }

   test(){
     console.log("Test called");
   }

   getInstances() : Instance[]{
     return this.Instances;
   }

   addInstance(data : any){
     console.log("Adding instance", data);
     var ins = new Instance(data);
     //ins.Workers = data.Workers;
     console.log("AddInstance", ins);
     this.Instances.push(ins);
   }

}
