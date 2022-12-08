import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  nonreadMensjaes: number = 0;
  showActividades: number = 0;
  basicData: any;

  basicOptions: any;
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
      console.log(JSON.parse(sessionStorage.getItem('currentUser')));
      
      this.userType = JSON.parse(sessionStorage.getItem('currentUser')).userType;
      this.loadState(this.userType);
    }else {

      this.loadState(0);
    }

    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#ebedef'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          }
      }
  };
  this.basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: '#FFA726',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
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
