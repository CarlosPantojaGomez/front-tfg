import { Component, OnInit, Input } from '@angular/core';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './adminUsers.component.html'
})
export class AdminProductsComponent implements OnInit {

  productos: Producto[];
  header: string;

  constructor(
    private productoService: ProductosService
  ) { }

  ngOnInit() {
    this.header = 'Usuarios';
    this.productoService.getProductos().subscribe(data =>{
        this.productos=data.body;
    });
        
  }

  protected loadData(producto: Producto) {
  }

  protected onError(errorMessage: string) {
    
  }

  protected changeHeader(tag: string) {
    this.header = tag;
  }

}