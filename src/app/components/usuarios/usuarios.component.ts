import { Component, OnInit } from '@angular/core';
import {UsuariosService} from "../../services/usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:any[]=[];

  constructor(private _productosService:UsuariosService) { 
    this._productosService.getUsuarios().subscribe(data =>{
    })
  }

  ngOnInit() {
  }

  borrarUsuario( key$:string){

    /* this._productosService.borrarUsuario(key$)
        .subscribe( respuesta=>{
          if( respuesta ){
            console.error(respuesta);
          }else{
            //todo bien
            delete this.usuarios[key$];
          }
        }) */

  }

  

}
