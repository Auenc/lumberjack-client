import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';

import {CollectorService} from '../collector.service';
import {Collector} from '../collector';


@Component({
  selector: 'app-collector-details',
  templateUrl: './collector-details.component.html',
  styleUrls: ['./collector-details.component.css'],
})
export class CollectorDetailsComponent implements OnInit {

  id : String
  private sub : any;

  collector : Collector


  constructor(private router: Router, private route: ActivatedRoute,
    private collectorService : CollectorService,
    public dialog: MdDialog) {
    }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.id = params["id"];
        this.getCollector(this.id);
      });
  }

  getCollector(id : String){
    this.collectorService.getCollector(id)
    .then(col => this.collector = col)
  }

  confirmDelete(){
    let dialogRef = this.dialog.open(DialogConfirmDelete);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.collectorService.deleteCollector(this.id)
        .then(() => {
          this.router.navigate(['/collectors/'])
        })
      }
    });
  }

}

@Component({
  selector : 'delete-result-dialog',
  templateUrl : "./dialog-confirm-delete.component.html"
})
export class DialogConfirmDelete {
  constructor(public dialogRef: MdDialogRef<DialogConfirmDelete>) {}
}
