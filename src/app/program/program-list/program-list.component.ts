import { Component, OnInit } from '@angular/core';

import {ProgramService} from '../program.service';
import {Program} from '../program';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

  Programs : Program[];

  constructor(private programService : ProgramService) { }

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms(){
    this.programService.getPrograms()
    .then(programs => this.Programs = programs);
  }

}
