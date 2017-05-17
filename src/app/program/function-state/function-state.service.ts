import { Injectable } from '@angular/core';
import {FunctionState} from './function-state';
import { Headers, Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class FunctionStateService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private FunctionStatesUrl = "http://localhost:3030/api/function-state";

  constructor(private http: Http) {
  }

  FunctionStates : FunctionState[];

  getFunctionStates(): Promise<FunctionState[]> {
    return this.http.get(this.FunctionStatesUrl)
    .toPromise().then(response => response.json() as FunctionState[])
    .catch(this.handleError);
  }

  getFunctionState(id : String) : Promise<FunctionState>{
    const url = `${this.FunctionStatesUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as FunctionState)
    .catch(this.handleError);
  }

  addFunctionState(col : FunctionState) : Promise<FunctionState>{
    return this.http.post(this.FunctionStatesUrl, JSON.stringify(col), {headers: this.headers})
    .toPromise().then(res => res.json() as FunctionState)
    .catch(this.handleError);
  }

  deleteFunctionState(id: String) : Promise<FunctionState>{
    const url = `${this.FunctionStatesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  updateFunctionState(col : FunctionState) : Promise<FunctionState>{
    const url = `${this.FunctionStatesUrl}/${col._id}`;
    return this.http.put(url, JSON.stringify(col), {headers : this.headers})
    .toPromise()
    .then(() => col)
    .catch(this.handleError);
  }


  private handleError(error : any): Promise<any>{
    console.log("An error occurred", error);
    return Promise.reject(error.message || error);
  }


}
