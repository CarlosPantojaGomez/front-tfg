import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styles: []
})
export class HomeUsuarioComponent implements OnInit {

  usuario: Usuario;
  id: string;

  constructor(private _usuariosService:UsuariosService,
    private router:Router,
    private route:ActivatedRoute) {  }

  ngOnInit() {
  }

}
