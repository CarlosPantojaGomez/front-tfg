import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-users',
  templateUrl: './usersTable.component.html'
})
export class UsersTableComponent implements OnInit {
    
    @Input() type: string;
    @Input() buttonNewUser: string;

    @Output() viewUser = new EventEmitter<number>();

    usuarios: Usuario[];
    header: string;
    modal: boolean;

    constructor(
        private usuarioService: UsuariosService,
        private router: Router
    ) { }

  ngOnInit() {
    this.header = 'Usuarios';
    this.modal = false;
    console.log(this.type);
    this.usuarioService.getUsuariosBy(this.type, 'Type').subscribe(data =>{
      this.usuarios=data.body;
    });
    
  }

  protected loadData() {
    this.usuarioService.getUsuariosBy(this.type, 'Type').subscribe(data =>{
      this.usuarios=data.body;
    });
  }

  protected onError(errorMessage: string) {
    
  }

  protected modalTrue() {
    this.modal = true;
  }

  protected changeHeader(tag: string){
    this.header = tag;
  }

  protected newClient() {
    this.router.navigate(['/registrarse','nuevo']);
  }

  protected deleteUser(value: any) {
    this.usuarioService.borrarUsuario(value).subscribe(data =>{
        this.loadData();
        
    });
    
  }

  verusuario(id: number){
    console.log(id);
    
    this.viewUser.emit(id);
  }

}