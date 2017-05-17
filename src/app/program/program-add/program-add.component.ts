import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {ProgramService} from '../program.service';
import {Program} from '../program';

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.css']
})
export class ProgramAddComponent implements OnInit {

  name : String;

  constructor(private router: Router, private programService : ProgramService) { }

  ngOnInit() {
  }

  addProgram(){
    var prog = new Program(null);
    prog.name = this.name.trim();
    if(!this.name){return;}

    this.programService.addProgram(prog)
    .then(prog => {
      this.router.navigate(["/programs/", prog._id]);
    })
  }

}
