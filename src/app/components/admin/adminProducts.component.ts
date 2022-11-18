import { Component, OnInit, Input } from '@angular/core';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './adminProducts.component.html'
})
export class AdminProductsComponent implements OnInit {

  productos: Producto[];
  header: string;
  buttonNewUser: string;

  creatingProduct: boolean;

  constructor(
    private productoService: ProductosService
  ) { }

  ngOnInit() {
    //this.header = 'Usuarios';
    this.productoService.getProductos().subscribe(data =>{
        this.productos=data.body;
    });

    this.creatingProduct = false;
    this.buttonNewUser = 'Nuevo Producto';
        
  }

  protected loadData(producto: Producto) {
  }

  protected onError(errorMessage: string) {
    
  }

  protected loadState(state: boolean) {
    this.creatingProduct = state;
  }
  
  protected changeHeader(tag: string) {
    this.header = tag;
  }

  protected deleteProduct(tag: string) {
    this.header = tag;
  }
}