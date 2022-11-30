import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
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

  projectId: number;

  constructor(
    private projectervice: ProjectService) { }

  ngOnInit() {

    this.projectervice.getProjects().subscribe(data =>{
      this.proyectos=data.body;
    });

    this.creatingProject = false;
    this.editingProject = false;
    this.buttonNewUser = 'Nuevo Proyecto';
  }

  

  protected loadState(create: boolean, edit: boolean) {
    this.creatingProject = create;
    this.editingProject = edit;

    if(!create && !edit){
      this.projectervice.getProjects().subscribe(data =>{
        this.proyectos=data.body;
      });
    }
  }

  protected editProject(id: number) {
    this.projectId = id;
    this.creatingProject = false;
    this.editingProject = true;
  }

}
