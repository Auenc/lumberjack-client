import { Injectable } from '@angular/core';
import {Collector} from './collector';
import { Headers, Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class CollectorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private collectorsUrl = "http://localhost:3030/api/collectors";

  constructor(private http: Http) {
  }

  Collectors : Collector[];

  getCollectors(): Promise<Collector[]> {
    return this.http.get(this.collectorsUrl)
    .toPromise().then(response => response.json() as Collector[])
    .catch(this.handleError);
  }

  getCollector(id : String) : Promise<Collector>{
    const url = `${this.collectorsUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Collector)
    .catch(this.handleError);
  }

  addCollector(col : Collector) : Promise<Collector>{
    return this.http.post(this.collectorsUrl, JSON.stringify(col), {headers: this.headers})
    .toPromise().then(res => res.json() as Collector)
    .catch(this.handleError);
  }

  deleteCollector(id: String) : Promise<Collector>{
    const url = `${this.collectorsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  updateCollector(col : Collector) : Promise<Collector>{
    const url = `${this.collectorsUrl}/${col._id}`;
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
