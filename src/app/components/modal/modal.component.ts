import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    
  }

}
