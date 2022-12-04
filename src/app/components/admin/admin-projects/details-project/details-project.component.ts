import { Component, OnInit, Input, ElementRef, ViewChild ,Output, EventEmitter} from '@angular/core';
import { PriorityLabelMapping } from 'src/app/interfaces/priorities';
import { Project } from 'src/app/interfaces/project.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.css']
})
export class DetailsProjectComponent implements OnInit {

  @Input() id: number;
  
  @Output() goTask = new EventEmitter<number>();

  project: Project;

  public PriorityLabelMapping = PriorityLabelMapping;
  
  tasks: Array<Task> = [];

  constructor(
    private projectService: ProjectService) { }

  ngOnInit() {
    console.log(this.project);
    
    if(this.id != undefined && this.id != 0){
      this.projectService.getProject(this.id.toString(10)).subscribe(data =>{
        this.project = data.body;

        this.tasks = this.project.tasks;
      });
    }
  }
  verTarea(id: number){
    this.goTask.emit(id);
  }

}
