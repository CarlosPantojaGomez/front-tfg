import { Component, OnInit, Input, ElementRef, ViewChild ,Output, EventEmitter} from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {
  @Input() createAllowed: boolean = false;
  @Input() projectId: number;

  tasks: Task[];
  header: string;
  buttonNewTask: string;

  creatingTask: boolean;
  editingTask: boolean;

  taskId: number;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.creatingTask = false;
    this.editingTask = false;
    this.buttonNewTask = 'Nueva tarea';
    if(this.projectId != null){
      this.taskService.getTasksByProject(this.projectId.toString(10)).subscribe(data =>{
        

        console.log(data.body);
        this.tasks = data.body;
        this.header = 'Editar Producto';
        
      });
    } else {
      this.taskService.getTasks().subscribe(data =>{
        

        this.tasks = data.body;
        
      });
    }
  }

  protected loadData(Task: Task) {
  }

  protected onError(errorMessage: string) {
    
  }

  protected loadState(create: boolean, edit: boolean) {
    this.creatingTask = create;
    this.editingTask = edit;

    if(!create && !edit){
      if(this.projectId != null){
        this.taskService.getTasksByProject(this.projectId.toString(10)).subscribe(data =>{
          
          console.log(data.body);
          
          this.tasks = data.body;
          
        });
      } else {
        this.taskService.getTasks().subscribe(data =>{
          
  
          this.tasks = data.body;
          
        });
      }
    }
  }

  protected editTask(id: number) {
    this.taskId = id;
    this.creatingTask = false;
    this.editingTask = true;
  }
  
  protected changeHeader(tag: string) {
    this.header = tag;
  }

  protected deleteTask(tag: string) {
    this.header = tag;
  }

  refresh(event: any){
    
    this.taskService.getTasks().subscribe(data =>{
      this.tasks=data.body;
    });
  }

}
