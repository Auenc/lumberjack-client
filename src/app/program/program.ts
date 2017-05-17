import {Instance} from "./instance/instance";
import {LFunction} from "./function/function";

export class Program {

   name : String;
   token : String;
   _id : String;
   Functions : LFunction[];
   InstanceIDs : String[];
   Instances : Instance[];

   constructor(data : any){
     if(data == null) return;
     console.log("Create program", data);
     this.name = data.name;
     this.token = data.token;
     this._id = data._id;
    this.InstanceIDs = data.Instances;
    let tmp :Instance[] = [];
    this.Instances = tmp;
    let funTmp : LFunction[] = [];
    this.Functions = funTmp;
    }

   addInstance(data : any, callback : Function){
     console.log("Adding instance", data);
     var ins = new Instance(data);
     this.Instances.push(ins);
     callback(ins);
   }

   functionExists(fun : LFunction) : boolean{
     console.log("compiled searching for", fun.Name)
     for(var i = 0; i < this.Functions.length;i++){
       console.log("compiled Checking function", this.Functions[i].Name, fun.Name);
       if(this.Functions[i].Name == fun.Name)
        return true;
     }
     return false;
   }

   compileStructure(){
     console.log("compiled called");
     for(var i = 0; i < this.Instances.length;i++){
       console.log("compiled looking at instance");
       var struct = this.Instances[i].Functions;
       for(var j = 0; j < struct.length;j++){
         if(!this.functionExists(struct[j])){
           console.log("Adding function");
           this.Functions.push(struct[j]);
         }
       }
     }
   }


   getAverageRunTime() : String{
     var total : number = 0;
     for(var i = 0; i < this.Instances.length;i++){
       total += this.Instances[i].getEndTime();
     }
     if(total != 0){
       return (total / this.Instances.length).toString() + "ms";
     }
     return "No information recorded";
   }

   getAverageStates() : number{
     var total : number = 0;
     for(var i = 0; i < this.Instances.length;i++){
       total += this.Instances[i].getNumberOfStates();
     }
     return total / this.Instances.length;
   }

}
