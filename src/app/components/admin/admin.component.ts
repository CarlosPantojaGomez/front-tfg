import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  nonreadMensjaes: number = 0;
  showActividades: number = 0;

  userType: number;

  usuariosView: boolean;
  ProductosView: boolean;
  ProyectosView: boolean;
  TareasView: boolean;
  MensajesView: boolean;
  NoticiasView: boolean;

  constructor() { }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      console.log(JSON.parse(sessionStorage.getItem('currentUser')));
      
      this.userType = JSON.parse(sessionStorage.getItem('currentUser')).userType;
      this.loadState(this.userType);
    }else {

      this.loadState(0);
    }
  }

  changeHeader() {
    
  }

  loadNonReadCount(event: number){
    console.log(event);
    this.nonreadMensjaes = event;
  }

  goToHome(){
    this.showActividades++;
    
  }

  protected loadState(userType: number){
    console.log(userType);
    
    switch (userType) {
      case 2:
        this.usuariosView = false;
        this.ProductosView = false;
        this.ProyectosView = true;
        this.TareasView = true;
        this.MensajesView = true;
        this.NoticiasView = false;
        break;
      case 3:
        this.usuariosView = true;
        this.ProductosView = true;
        this.ProyectosView = true;
        this.TareasView = true;
        this.MensajesView = true;
        this.NoticiasView = true;
        break;
      case 4:
        this.usuariosView = true;
        this.ProductosView = true;
        this.ProyectosView = true;
        this.TareasView = true;
        this.MensajesView = true;
        this.NoticiasView = true;
        break;
      default:
        break;
    }
  }
}
