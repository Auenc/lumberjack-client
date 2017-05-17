import { Injectable } from '@angular/core';
import {Action} from './action';
import { Headers, Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ActionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private ActionsUrl = "http://localhost:3030/api/action";

  constructor(private http: Http) {
  }

  Actions : Action[];

  getActions(): Promise<Action[]> {
    return this.http.get(this.ActionsUrl)
    .toPromise().then(response => response.json() as Action[])
    .catch(this.handleError);
  }

  getAction(id : String) : Promise<Action>{
    const url = `${this.ActionsUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Action)
    .catch(this.handleError);
  }

  addAction(col : Action) : Promise<Action>{
    return this.http.post(this.ActionsUrl, JSON.stringify(col), {headers: this.headers})
    .toPromise().then(res => res.json() as Action)
    .catch(this.handleError);
  }

  deleteAction(id: String) : Promise<Action>{
    const url = `${this.ActionsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  updateAction(col : Action) : Promise<Action>{
    const url = `${this.ActionsUrl}/${col._id}`;
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
