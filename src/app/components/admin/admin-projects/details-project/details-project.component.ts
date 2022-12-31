import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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

  proyectoView: boolean;
  usuariosView: boolean;

  
  paraDesarrollar: number = 0 ;
  enDesarrollo: number = 0 ;
  listasParaVerificar: number = 0 ;
  completadas: number = 0 ;

  public PriorityLabelMapping = PriorityLabelMapping;
  
  tasks: Array<Task> = [];

  constructor(
    private projectService: ProjectService) { }

  ngOnInit() {
    this.proyectoView = true;
    
    if(this.id != undefined && this.id != 0){
      this.projectService.getProject(this.id.toString(10)).subscribe(data =>{
        this.project = data.body;

        this.project.tasks.forEach((element,index)=>{
          switch (element.state) {
            case 0:
              this.paraDesarrollar++;
              break;
            case 1:
              this.enDesarrollo++;
              break;
            case 2:
              this.listasParaVerificar++;
              break;
            case 3:
              this.completadas++;
              break;
            default:
              break;
          }
        });
        this.tasks = this.project.tasks;
      });
    }
  }
  verTarea(id: number){
    this.goTask.emit(id);
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.proyectoView = true;
        this.usuariosView = false;
        break;
      case 2:
        this.proyectoView = false;
        this.usuariosView = true;
        break;
      case 3:
      default:

        break;
    }
    
  }

}
