import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  nonreadMensjaes: number = 0;
  showActividades: number = 0;
  showGraficas: number = 0;

  userType: number;

  usuariosView: boolean;
  ProductosView: boolean;
  ProyectosView: boolean;
  TareasView: boolean;
  MensajesView: boolean;
  NoticiasView: boolean;
  GraficasView: boolean;

  constructor() { }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      
      this.userType = JSON.parse(sessionStorage.getItem('currentUser')).userType;
      this.loadState(this.userType);
    }else {

      this.loadState(0);
    }
  }

  changeHeader() {
    
  }

  loadNonReadCount(event: number){
    this.nonreadMensjaes = event;
  }

  goToHome(){
    this.showActividades++;
    
  }

  goToGraficas(){
    this.showGraficas++;
    
  }

  protected loadState(userType: number){
    
    switch (userType) {
      case 2:
        this.usuariosView = false;
        this.ProductosView = false;
        this.ProyectosView = true;
        this.TareasView = true;
        this.MensajesView = true;
        this.NoticiasView = false;
        this.GraficasView = false;
        break;
      case 3:
        this.usuariosView = true;
        this.ProductosView = true;
        this.ProyectosView = true;
        this.TareasView = true;
        this.MensajesView = true;
        this.NoticiasView = true;
        this.GraficasView = true;
        break;
      case 4:
        this.usuariosView = true;
        this.ProductosView = true;
        this.ProyectosView = true;
        this.TareasView = true;
        this.MensajesView = true;
        this.NoticiasView = true;
        this.GraficasView = true;
        break;
      default:
        break;
    }
  }
}
