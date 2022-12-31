import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task.interface';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  taskState: boolean;
  task: Task;
  tasks: any[];
  messages: any[];

  constructor( private taskService: TaskService) { }

  ngOnInit() {
    this.taskState = false;
    this.taskService.getTasks().subscribe(data =>{
      this.tasks = data.body;
      
  });

  }

  changeHeader() {
    
  }

  showTask(state: boolean) {
    this.taskState = state;
  }
  loadTask(task: Task) {
    
    this.task = task;
  }
}
