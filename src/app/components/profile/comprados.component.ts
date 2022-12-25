import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-comprados',
  templateUrl: './comprados.component.html'
})
export class CompradosComponent implements OnInit {

  @Input() id: string;
  usuario: Usuario;
  show: boolean = false;
  productos: Producto[];

  constructor(
    private productosService: ProductosService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.usuarioService.getusuario(this.id)
        .subscribe(
          (res: HttpResponse<Usuario>) => this.loadData(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    
  }protected loadData(usuario: Usuario) {
    console.log(usuario);
    
    this.usuario = usuario;
    this.productos = this.usuario.productsBought;
    this.show = true;
  }
  protected onError(errorMessage: string) {
    
  }

  downloadProduct(productId: number){
    this.productosService.getProductFile(productId.toString(10)).subscribe(data =>{
      data.body;
      const src = data.body.data;
      const link = document.createElement("a")
      link.href = src
      link.download = data.body.name
      link.click()

      link.remove()
    })
  }

}