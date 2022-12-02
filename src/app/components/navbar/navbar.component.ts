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

  id: string;

  constructor(
    private ls: EventManagerService,
    private router: Router) { }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
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
        this.perfil = false;
        break;
      case 1:
        this.productos = true;
        this.registrarse = false;
        this.chat = true;
        this.usuarios = false;
        this.login = false;
        this.logout = true;
        this.trabajo = false;
        this.perfil = true;
        break;
      case 2:
        break;
      case 4:
        this.productos = false;
        this.registrarse = false;
        this.chat = false;
        this.usuarios = false;
        this.login = false;
        this.logout = true;
        this.trabajo = false;
        this.perfil = false;
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
