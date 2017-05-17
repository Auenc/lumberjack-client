import { Injectable } from '@angular/core';
import {Instance} from './instance';
import { Headers, Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class InstanceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private InstancesUrl = "http://localhost:3030/api/instance";

  constructor(private http: Http) {
  }

  Instances : Instance[];

  getInstances(): Promise<Instance[]> {
    return this.http.get(this.InstancesUrl)
    .toPromise().then(response => response.json() as Instance[])
    .catch(this.handleError);
  }

  getInstance(id : String) : Promise<Instance>{
    const url = `${this.InstancesUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Instance)
    .catch(this.handleError);
  }

  addInstance(col : Instance) : Promise<Instance>{
    return this.http.post(this.InstancesUrl, JSON.stringify(col), {headers: this.headers})
    .toPromise().then(res => res.json() as Instance)
    .catch(this.handleError);
  }

  deleteInstance(id: String) : Promise<Instance>{
    const url = `${this.InstancesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  updateInstance(col : Instance) : Promise<Instance>{
    const url = `${this.InstancesUrl}/${col._id}`;
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
