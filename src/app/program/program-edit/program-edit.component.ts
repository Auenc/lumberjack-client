import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import {ProgramService} from '../program.service';
import {Program} from '../program';

@Component({
  selector: 'app-Program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {

  id : String
  private sub : any;

  program : Program

  constructor(private router: Router, private route: ActivatedRoute,
    private ProgramService : ProgramService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getProgram(this.id);
    });
  }

  getProgram(id : String) : void{
    this.ProgramService.getProgram(id)
    .then(col => this.program = col)
  }

  save() : void{
    this.ProgramService.updateProgram(this.program)
    .then(() => {
      this.router.navigate(['/programs/', this.program._id]);
    });
  }

}
