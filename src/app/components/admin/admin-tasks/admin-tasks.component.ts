import { Component, OnInit, Input} from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {
  @Input() createAllowed: boolean = false;
  @Input() projectId: number;

  subscription: any;

  tasks: Task[];
  header: string;
  buttonNewTask: string;

  creatingTask: boolean;
  editingTask: boolean;
  detailsTask: boolean;

  taskId: number;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.creatingTask = false;
    this.editingTask = false;
    this.detailsTask = false;
    this.buttonNewTask = 'Nueva tarea';
    this.loadData();
    this.subscription = this.taskService.getRefreshListEmitter().subscribe(() => this.loadData());
  }

  protected loadData() {
    if(this.projectId != null){
      this.taskService.getTasksByProject(this.projectId.toString(10)).subscribe(data =>{
        
        this.tasks = data.body;
        this.header = 'Editar Producto';
        
      });
    } else {
      
      this.loadTasks();
    }
  }

  protected onError(errorMessage: string) {
    
  }


  protected loadState(create: boolean, edit: boolean, detailsTask: boolean) {
    this.creatingTask = create;
    this.editingTask = edit;
    this.detailsTask = detailsTask;

    if(!create && !edit && !detailsTask){
      this.loadData();
    }
  }

  editTask(id: number) {
    this.taskId = id;
    this.creatingTask = false;
    this.editingTask = true;
    this.detailsTask = false;
  }

  deleteTask(id: number){
    
    this.taskService.deleteTask(id.toString(10)).subscribe(data =>{
      
    });
  }

  verTarea(id: number){
    this.taskId = id;
    this.creatingTask = false;
    this.editingTask = false;
    this.detailsTask = true;
  }
  
  protected changeHeader(tag: string) {
    this.header = tag;
  }

  loadTasks(){
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      if(JSON.parse(sessionStorage.getItem('currentUser')).userType != 4){
        this.taskService.getTasksByUser(JSON.parse(sessionStorage.getItem('currentUser')).id.toString(10)).subscribe(data =>{
          this.tasks=data.body; 
        });
      }else {
        this.taskService.getTasks().subscribe(data =>{
          this.tasks=data.body;
        });
      }
    }

  }

  refresh(event: any){
    
    this.taskService.getTasks().subscribe(data =>{
      this.tasks=data.body;
    });
  }

  showOptions(creator: Usuario){
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null && creator != null){
      if(JSON.parse(sessionStorage.getItem('currentUser')).id == creator.id){
        return true;
      }else {
        return false;
      }
    } else {
      return false;
    }
  }
  

}
