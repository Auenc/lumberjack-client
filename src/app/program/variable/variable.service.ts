import { Injectable } from '@angular/core';
import {Variable} from './variable';
import { Headers, Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class VariableService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private VariablesUrl = "http://localhost:3030/api/variable";

  constructor(private http: Http) {
  }

  Variables : Variable[];

  getVariables(): Promise<Variable[]> {
    return this.http.get(this.VariablesUrl)
    .toPromise().then(response => response.json() as Variable[])
    .catch(this.handleError);
  }

  getVariable(id : String) : Promise<Variable>{
    const url = `${this.VariablesUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Variable)
    .catch(this.handleError);
  }

  addVariable(col : Variable) : Promise<Variable>{
    return this.http.post(this.VariablesUrl, JSON.stringify(col), {headers: this.headers})
    .toPromise().then(res => res.json() as Variable)
    .catch(this.handleError);
  }

  deleteVariable(id: String) : Promise<Variable>{
    const url = `${this.VariablesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  updateVariable(col : Variable) : Promise<Variable>{
    const url = `${this.VariablesUrl}/${col._id}`;
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
