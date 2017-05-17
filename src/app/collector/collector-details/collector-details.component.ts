import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';

import {CollectorService} from '../collector.service';
import {Collector} from '../collector';
import {Instance} from "../../program/instance/instance";
import {InstanceService} from "../../program/instance/instance.service";
import {ProgramService} from "../../program/program.service";


@Component({
  selector: 'app-collector-details',
  templateUrl: './collector-details.component.html',
  styleUrls: ['./collector-details.component.css'],
})
export class CollectorDetailsComponent implements OnInit {

  id: String
  private sub: any;

  collector: Collector

  constructor(private router: Router, private route: ActivatedRoute,
    private collectorService: CollectorService,
    public dialog: MdDialog, private instanceService: InstanceService,
    private programService: ProgramService,
    private zone: NgZone) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getCollector(this.id);
    });
  }

  getCollector(id: String) {
    this.collectorService.getCollector(id)
      .then(col => this.collector = new Collector(col)).then(() => this.getInstances());
  }

  confirmDelete() {
    let dialogRef = this.dialog.open(DialogConfirmDelete);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.collectorService.deleteCollector(this.id)
          .then(() => {
            this.router.navigate(['/collectors/'])
          })
      }
    });
  }

  getInstances() {
    if (this.collector == null) return;
    console.log("Get instances called");
    for (var i = 0; i < this.collector.InstanceIDs.length; i++) {
      console.log("Instance ID", );
      var instance;
      this.instanceService.getInstance(this.collector.InstanceIDs[i])
        .then(ins => {
          console.log("ins ", ins);
          this.programService.getProgram(ins._program)
            .then(prog => {
              ins.Program = prog; this.collector.addInstance(ins)
            });
        });
    }
    console.log("Collector with instances", this.collector)
  }

}

@Component({
  selector: 'delete-result-dialog',
  templateUrl: "./dialog-confirm-delete.component.html"
})
export class DialogConfirmDelete {
  constructor(public dialogRef: MdDialogRef<DialogConfirmDelete>) { }
}
