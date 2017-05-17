import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {VariableService} from "./variable.service";
import {Variable} from "./variable";

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.css']
})
export class VariableComponent implements OnInit {

  id: String
  private sub: any;

  variable : Variable;

  constructor(private router: Router, private route: ActivatedRoute,
    private variableService : VariableService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getVariable(this.id);
    });
  }

  getVariable(id : String){
    this.variableService.getVariable(id).then(va => {
      this.variable = new Variable(va);
    })
  }



}
