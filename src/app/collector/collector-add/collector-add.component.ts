import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {CollectorService} from '../collector.service';
import {Collector} from '../collector';
@Component({
  selector: 'app-collector-add',
  templateUrl: './collector-add.component.html',
  styleUrls: ['./collector-add.component.css']
})
export class CollectorAddComponent implements OnInit {

  name : String;

  constructor(private router: Router, private collectorService : CollectorService) { }

  ngOnInit() {
  }

  addCollector(){
    var col = new Collector();
    col.name = this.name.trim();
    if(!this.name) {return;}
    this.collectorService.addCollector(col).then(col => {
      this.router.navigate(["/collectors", col._id]);
    });
  }

}
