import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';

import {ProgramService} from '../program.service';
import {Program} from '../program';


@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css'],
})
export class ProgramDetailsComponent implements OnInit {

  id : String
  private sub : any;

  program : Program


  constructor(private router: Router, private route: ActivatedRoute,
    private ProgramService : ProgramService,
    public dialog: MdDialog) {
    }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.id = params["id"];
        this.getProgram(this.id);
      });
  }

  getProgram(id : String){
    this.ProgramService.getProgram(id)
    .then(col => this.program = col)
  }

  confirmDelete(){
    let dialogRef = this.dialog.open(DialogConfirmDelete);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ProgramService.deleteProgram(this.id)
        .then(() => {
          this.router.navigate(['/programs/'])
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
