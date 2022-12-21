import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventManagerService } from 'src/app/services/eventManager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  eventSubscriber: Subscription;

  productos: boolean;
  registrarse: boolean;
  chat: boolean;
  usuarios: boolean;
  login: boolean;
  logout: boolean;
  trabajo: boolean;
  perfil: boolean;
  cesta: boolean;
  numProductos: number = 0;

  routeHome: string;
  id: string;

  constructor(
    private ls: EventManagerService,
    private router: Router) { }

  ngOnInit() {
    this.routeHome = "home";

    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      console.log(JSON.parse(sessionStorage.getItem('currentUser')).basket);
      if(JSON.parse(sessionStorage.getItem('currentUser')).basket != null && JSON.parse(sessionStorage.getItem('currentUser')).basket.products != undefined&& JSON.parse(sessionStorage.getItem('currentUser')).basket.products != null && JSON.parse(sessionStorage.getItem('currentUser')).basket.products.length > 0){
        this.numProductos = JSON.parse(sessionStorage.getItem('currentUser')).basket.products.length
      }
      
      this.loadState(JSON.parse(sessionStorage.getItem('currentUser')).userType);
        this.id = JSON.parse(sessionStorage.getItem('currentUser')).id;
    }else {

      this.loadState(0);
    }
    this.subscribeLogIn();
    
  }

  protected subscribeLogIn() {
    this.ls.getEventLoggedEmitter().subscribe(e => {
      if(e != null) {
        this.numProductos = JSON.parse(sessionStorage.getItem('currentUser')).basket.products.length
        this.loadState(JSON.parse(sessionStorage.getItem('currentUser')).userType);
        this.id = JSON.parse(sessionStorage.getItem('currentUser')).id;
      }
    });
  }

  protected logOut() {
    sessionStorage.removeItem('currentUser');
    this.loadState(0);
    this.router.navigate(['/']);
  }

  protected loadState(state: number) {
    
    switch ( state ) {
      case 0:
        this.productos = true;
        this.registrarse = true;
        this.chat = false;
        this.usuarios = false;
        this.login = true;
        this.logout = false;
        this.trabajo = false;
        this.cesta = false;
        this.perfil = false;
        this.routeHome = "home";
        break;
      case 1:
        this.productos = true;
        this.registrarse = false;
        this.chat = true;
        this.usuarios = false;
        this.login = false;
        this.logout = true;
        this.trabajo = false;
        this.cesta = true;
        this.perfil = true;
        this.routeHome = "home";
        break;
      case 2:
        this.productos = false;
        this.registrarse = false;
        this.chat = false;
        this.usuarios = false;
        this.login = false;
        this.logout = true;
        this.trabajo = true;
        this.cesta = false;
        this.perfil = true;
        this.routeHome = "admin";
        this.router.navigate(['/admin']);
        break;
      case 3:
        this.productos = false;
        this.registrarse = false;
        this.chat = false;
        this.usuarios = false;
        this.login = false;
        this.logout = true;
        this.trabajo = true;
        this.cesta = false;
        this.perfil = true;
        this.routeHome = "admin";
        this.router.navigate(['/admin']);
        break;
      case 4:
        this.productos = false;
        this.registrarse = false;
        this.chat = false;
        this.usuarios = false;
        this.login = false;
        this.logout = true;
        this.trabajo = false;
        this.cesta = false;
        this.perfil = false;
        this.routeHome = "admin";
        this.router.navigate(['/admin']);
      default:
        console.log('nulo');
        ;
    }
  }

  protected goToProfile() {
    this.router.navigate(['/perfil', this.id]);
  }

}
