import { Injectable } from '@angular/core';
import {LFunction} from './function';
import { Headers, Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class FunctionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private LFunctionsUrl = "http://localhost:3030/api/function";

  constructor(private http: Http) {
  }

  LFunctions : LFunction[];

  getFunctions(): Promise<LFunction[]> {
    return this.http.get(this.LFunctionsUrl)
    .toPromise().then(response => response.json() as LFunction[])
    .catch(this.handleError);
  }

  getFunction(id : String) : Promise<LFunction>{
    const url = `${this.LFunctionsUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as LFunction)
    .catch(this.handleError);
  }

  getCaller(id : String) : Promise<LFunction>{
    const url = `${this.LFunctionsUrl}/?ID=${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as LFunction)
    .catch(this.handleError);
  }

  addFunction(col : LFunction) : Promise<LFunction>{
    return this.http.post(this.LFunctionsUrl, JSON.stringify(col), {headers: this.headers})
    .toPromise().then(res => res.json() as LFunction)
    .catch(this.handleError);
  }

  deleteFunction(id: String) : Promise<LFunction>{
    const url = `${this.LFunctionsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  updateFunction(col : LFunction) : Promise<LFunction>{
    const url = `${this.LFunctionsUrl}/${col._id}`;
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
