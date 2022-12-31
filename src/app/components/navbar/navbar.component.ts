import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventManagerService } from 'src/app/services/eventManager.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { BasketService } from 'src/app/services/basket.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private usuarioService: UsuariosService,
    private basketService: BasketService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.routeHome = "home";

    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      if(JSON.parse(sessionStorage.getItem('currentUser')).basket != null && JSON.parse(sessionStorage.getItem('currentUser')).basket.products != undefined&& JSON.parse(sessionStorage.getItem('currentUser')).basket.products != null && JSON.parse(sessionStorage.getItem('currentUser')).basket.products.length > 0){
        this.numProductos = JSON.parse(sessionStorage.getItem('currentUser')).basket.products.length
      }
      
      this.loadState(JSON.parse(sessionStorage.getItem('currentUser')).userType);
        this.id = JSON.parse(sessionStorage.getItem('currentUser')).id;
    }else {

      this.loadState(0);
    }
    this.subscribeLogIn();
    
    this.authenticationService.getRefreshCoockieUserEmitter().subscribe(() => this.updateUser());
    
  }

  protected subscribeLogIn() {
    this.ls.getEventLoggedEmitter().subscribe(e => {
      if(e != null) {
        if(JSON.parse(sessionStorage.getItem('currentUser')).basket != null && JSON.parse(sessionStorage.getItem('currentUser')).basket.products != null){

          this.numProductos = JSON.parse(sessionStorage.getItem('currentUser')).basket.products.length;
        }
        this.loadState(JSON.parse(sessionStorage.getItem('currentUser')).userType);
        this.id = JSON.parse(sessionStorage.getItem('currentUser')).id;
      }
    });
  }

  protected updateUser() {
    
    if(JSON.parse(sessionStorage.getItem('currentUser')) != null && JSON.parse(sessionStorage.getItem('currentUser')).basket != null && JSON.parse(sessionStorage.getItem('currentUser')).basket.products != null){
      this.numProductos = JSON.parse(sessionStorage.getItem('currentUser')).basket.products.length;
    } else {
      this.numProductos = 0;
    }
  }

  protected logOut() {
    sessionStorage.removeItem('currentUser');
    this.loadState(0);
    this.authenticationService.refreshCoockieUser.emit();
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
        ;
    }
  }

  protected goToProfile() {
    this.router.navigate(['/perfil', this.id]);
  }

}
