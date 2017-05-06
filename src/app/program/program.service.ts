import { Injectable } from '@angular/core';
import {Program} from './program';
import { Headers, Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProgramService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private ProgramsUrl = "http://localhost:3030/api/programs";

  constructor(private http: Http) {
  }

  Programs : Program[];

  getPrograms(): Promise<Program[]> {
    return this.http.get(this.ProgramsUrl)
    .toPromise().then(response => response.json() as Program[])
    .catch(this.handleError);
  }

  getProgram(id : String) : Promise<Program>{
    const url = `${this.ProgramsUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Program)
    .catch(this.handleError);
  }

  addProgram(col : Program) : Promise<Program>{
    return this.http.post(this.ProgramsUrl, JSON.stringify(col), {headers: this.headers})
    .toPromise().then(res => res.json() as Program)
    .catch(this.handleError);
  }

  deleteProgram(id: String) : Promise<Program>{
    const url = `${this.ProgramsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  updateProgram(col : Program) : Promise<Program>{
    const url = `${this.ProgramsUrl}/${col._id}`;
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
