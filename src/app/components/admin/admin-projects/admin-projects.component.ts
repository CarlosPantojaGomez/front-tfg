import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit {

  proyectos: Project[];
  header: string;
  buttonNewUser: string;

  creatingProject: boolean;
  editingProject: boolean;
  detailsProject: boolean;
  detailsTask: boolean;

  projectId: number;
  taskId: number;

  constructor(
    private projectervice: ProjectService) { }

  ngOnInit() {

    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      if(JSON.parse(sessionStorage.getItem('currentUser')).userType != 4){
        this.projectervice.getProjectsForUser(JSON.parse(sessionStorage.getItem('currentUser')).id.toString(10)).subscribe(data =>{
          this.proyectos=data.body;
        });
      }else {
        this.projectervice.getProjects().subscribe(data =>{
          this.proyectos=data.body;
        });
      }
    }
    

    this.creatingProject = false;
    this.editingProject = false;
    this.detailsProject = false;
    this.detailsTask = false;
    this.buttonNewUser = 'Nuevo Proyecto';
  }

  

  protected loadState(create: boolean, edit: boolean, detailsProject: boolean, detailsTask: boolean) {
    this.creatingProject = create;
    this.editingProject = edit;
    this.detailsProject = detailsProject;
    this.detailsTask = detailsTask;

    if(!create && !edit && !detailsProject && !detailsTask){
      this.projectervice.getProjects().subscribe(data =>{
        this.proyectos=data.body;
      });
    }
  }

  protected editProject(id: number) {
    this.projectId = id;
    this.creatingProject = false;
    this.editingProject = true;
    this.detailsProject = false;
    this.detailsTask = false;
  }

  verProyecto(id: number){
    this.projectId = id;
    this.creatingProject = false;
    this.editingProject = false;
    this.detailsProject = true;
    this.detailsTask = false;
  }

  verTarea(id: number){
    this.taskId = id;
    this.creatingProject = false;
    this.editingProject = false;
    this.detailsProject = false;
    this.detailsTask = true;
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

  deleteProject(id: number){
    console.log(id);
    
    this.projectervice.deleteProject(id.toString(10)).subscribe(data =>{
        

      console.log(data.body);
      
    });
  }
}
