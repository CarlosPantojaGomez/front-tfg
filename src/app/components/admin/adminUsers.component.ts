import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './adminUsers.component.html'
})
export class AdminUsersComponent implements OnInit {

  usuario: Usuario;

  header: string;
  buttonNewUser: string;
  state: string; 

  vistaAdmin: boolean;
  vistaAltoCargo: boolean;

  modal: boolean;
  clientes: boolean;
  trabajadores: boolean;
  responsables: boolean;
  creatingClient: boolean;
  creatingEmployee: boolean;
  creatingManager: boolean;
  
  constructor(
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.header = 'Usuarios';
    this.modal = false;

    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      console.log(JSON.parse(sessionStorage.getItem('currentUser')));
      
      this.usuario = JSON.parse(sessionStorage.getItem('currentUser'));
      if (this.usuario.userType == 4){
        this.vistaAdmin = true;
        this.vistaAltoCargo = false;

        this.loadState('clientes');
      } else if (this.usuario.userType == 3){

        this.vistaAdmin = false;
        this.vistaAltoCargo = true;

        this.loadState('trabajadores');
      }
    }
        
  }

  public loadState(state: string) {
    switch (state) {
      case 'clientes':
        this.clientes = true;
        this.trabajadores = false;
        this.responsables = false;
        this.creatingClient = false;
        this.state = 'clientes';
        this.buttonNewUser = 'Nuevo Cliente';
        break;
      case 'trabajadores':
        this.clientes = false;
        this.trabajadores = true;
        this.responsables = false;
        this.creatingEmployee = false;
        this.state = 'trabajadores';
        this.buttonNewUser = 'Nuevo Trabajador';
        break;
      case 'responsables':
        this.clientes = false;
        this.trabajadores = false;
        this.responsables = true;
        this.creatingManager = false;
        this.state = 'responsables';
        this.buttonNewUser = 'Nuevo Responsable';
        break;
      case 'creatingClient':
        this.clientes = false;
        this.trabajadores = false;
        this.responsables = false;
        this.creatingClient = true;
        this.creatingEmployee = false;
        this.creatingManager = false;
        break;
      case 'creatingEmployee':
        this.clientes = false;
        this.trabajadores = false;
        this.responsables = false;
        this.creatingClient = false;
        this.creatingEmployee = true;
        this.creatingManager = false;
        break;
      case 'creatingManager':
        this.clientes = false;
        this.trabajadores = false;
        this.responsables = false;
        this.creatingClient = false;
        this.creatingEmployee = false;
        this.creatingManager = true;
        break;
      default:
        break;
    }
  }

  protected onError(errorMessage: string) {
    
  }

  protected modalTrue() {
    this.modal = true;
  }

  protected changeHeader(tag: string){
    this.header = tag;
  }
  
  protected newUser() {
    this.router.navigate(['/registrarse','nuevo']);
  }
}