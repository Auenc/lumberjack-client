import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {CollectorService} from '../collector.service';
import {Collector} from '../collector';


@Component({
  selector: 'app-collector-list',
  templateUrl: './collector-list.component.html',
  styleUrls: ['./collector-list.component.css'],
  providers: [CollectorService]
})
export class CollectorListComponent implements OnInit {

  Collectors : Collector[];

  constructor(private collectorService : CollectorService) {
    this.getCollectors();
  }

  ngOnInit() {
  }

  getCollectors(){
    this.collectorService.getCollectors()
    .then(collectors => this.Collectors = collectors).then(collectors => console.log("got collectors"));
  }


}
