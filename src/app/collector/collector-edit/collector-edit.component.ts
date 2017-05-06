import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import {CollectorService} from '../collector.service';
import {Collector} from '../collector';

@Component({
  selector: 'app-collector-edit',
  templateUrl: './collector-edit.component.html',
  styleUrls: ['./collector-edit.component.css']
})
export class CollectorEditComponent implements OnInit {

  id : String
  private sub : any;

  collector : Collector

  constructor(private router: Router, private route: ActivatedRoute,
    private collectorService : CollectorService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getCollector(this.id);
    });
  }

  getCollector(id : String) : void{
    this.collectorService.getCollector(id)
    .then(col => this.collector = col)
  }

  save() : void{
    this.collectorService.updateCollector(this.collector)
    .then(() => {
      this.router.navigate(['/collectors/', this.collector._id]);
    });
  }

}
