import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './adminUsers.component.html'
})
export class AdminUsersComponent implements OnInit {

  usuarios: Usuario[];

  header: string;
  buttonNewUser: string;
  state: string; 

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
    this.loadState('clientes');
    this.usuarioService.getUsuarios().subscribe(data =>{
        this.usuarios=data.body;
    });
        
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