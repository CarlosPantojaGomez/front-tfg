import { Component, OnInit } from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Producto } from 'src/app/interfaces/producto.interface';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  
  constructor(private _productosService:ProductosService,
    private router: Router) { 

    this._productosService.getProductos().subscribe(data =>{
      this.productos=data.body;
      console.log(this.productos);
      
    })
  }

  ngOnInit() {
    
    if ( sessionStorage.getItem('currentUser') == null) {
      console.log('null');
    } else {
      console.log('no null');
    }
  }

  verproducto(key:string){
    this.router.navigate(['/producto', key]);
  }

  
}
