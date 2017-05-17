import { Pipe, PipeTransform } from '@angular/core';

import {Action} from "./action";

@Pipe({
  name: 'sortActionByTime'
})
export class SortActionByTimePipe implements PipeTransform {

  transform(acs: Array<any>, args?: any): Array<any> {
    console.log("sort Transform called");
    if(!acs){ console.log("sort returning null");return; }
    console.log("Starting sort");
    var sorted = acs.sort((a : any, b : any) => {
      console.log("Sorting");
      if(a.Type == "End"){
        console.log("Sort returning -1");
        return -1;
      }
      if(a.TimeCreated.getTime() > b.TimeCreated.getTime()){
        console.log("Sort returning -1");
        return -1;
      }
      if(a.TimeCreated.getTime() < b.TimeCreated.getTime()){
        console.log("Sort returning 1");
        return 1;
      }
      console.log("Sort returning 0");
      return 0;
    });
    console.log("Unsorted", acs, "Sorted", sorted);
    return sorted;
  }

}
