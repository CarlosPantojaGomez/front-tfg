import { Component, OnInit , Input, SimpleChanges} from '@angular/core';
import { Activity } from 'src/app/interfaces/Activity.interface';
import { FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ActivityService } from 'src/app/services/activity.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  @Input() change: number;
  activities: Activity[];
  activitiesToShow: Activity[];
  usuario: Usuario;

  detailsProject: boolean;
  detailsTask: boolean;
  projectId: number;
  taskId: number;
  proyectos: boolean;
  tareas: boolean;

  constructor(
    private activityService: ActivityService,
    private usuarioService: UsuariosService) { }

  ngOnInit() {

    this.proyectos = true;
    this.tareas = false;
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }

  protected load(){
    this.detailsProject = false;
    this.detailsTask = false;

    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){

      this.activityService.getActivitiesByUserId(JSON.parse(sessionStorage.getItem('currentUser')).id).subscribe(data =>{
        console.log(data.body);
        this.activities = data.body;

        
        this.filterActivities();
        
      });

      this.usuarioService.getusuario(JSON.parse(sessionStorage.getItem('currentUser')).id).subscribe(data =>{
        console.log(data.body);
        this.usuario = data.body;
       
        
      });
    }
  }

  protected filterActivities(){
    if(this.proyectos && this.tareas){
      this.activitiesToShow = this.activities;
    } else if(this.proyectos){
      this.activitiesToShow = this.activities.filter(obj => {
        return obj.project != null
      });
    } else if (this.tareas){
      this.activitiesToShow = this.activities.filter(obj => {
        return obj.task != null
      });
    } else {
      this.activitiesToShow= [];
    }
    
  }

  protected loadState(detailsProject: boolean, detailsTask: boolean) {
    this.detailsProject = detailsProject;
    this.detailsTask = detailsTask;

    if(!detailsProject && !detailsTask){
      this.load();
    }
  }

  verProyecto(id: number){
    this.projectId = id;
    this.detailsProject = true;
    this.detailsTask = false;
  }

  verTarea(id: number){
    this.taskId = id;
    this.detailsProject = false;
    this.detailsTask = true;
  }

  verActividad(act: Activity){
    if (act.task != null){
      this.verTarea(act.task.id)
    } else if(act.project != null){
      this.verProyecto(act.project.id);
    }
    
  }

}
