import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent implements OnInit {

  editForm = this.fb.group({
    name: [],
    prioridad: [],
    description: [],
    producto: []
  });
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
