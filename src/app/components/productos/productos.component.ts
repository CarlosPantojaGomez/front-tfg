import { Component, OnInit } from '@angular/core';
import { ProductosService } from "../../services/productos.service";
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  usuario: Usuario;
  productos: Producto[];
  
  constructor(
    private _productosService:ProductosService,
    private router: Router,
    private usuarioService: UsuariosService
  ) { 
    
    this._productosService.getProductos().subscribe(data =>{
      this.productos=data.body;
    })
  }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      this.usuario = JSON.parse(sessionStorage.getItem('currentUser'));
    }
  }

  verproducto(key:string){
    this.router.navigate(['/producto', key]);
  }

  addProduct(product: Producto){
    
    const request={
      product: product,
      user: this.usuario,
    };

    this.subscribeToSaveResponse(this.usuarioService.addProductToUserBasket(request));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError());
  }
  protected onSaveSuccess(res: any) {
    this.usuarioService.refreshUser.emit();
  }
  protected onSaveError() {
  }

  checkIfBought(productId: number){
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      if(this.usuario.productsBought != undefined && this.usuario.productsBought != null && this.usuario.productsBought.length != 0){
        if (this.usuario.productsBought.filter(e => e.id === productId).length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }else {
      return false;
    }
  }
  
}
