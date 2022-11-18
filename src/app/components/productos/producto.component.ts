import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

import {ProductosService} from '../../services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {
  
  producto: Producto;
  features: boolean;
  manuals: boolean;
  nuevo:boolean = false;
  id: string;


  constructor (
    private _productosService: ProductosService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe( parametros =>{
        this.id = parametros['id']; 
      });
  }

  ngOnInit() {
    this._productosService.getProducto(this.id).subscribe(data =>{
      this.producto=data.body;
    });
    this.features = false;
    this.manuals = false;
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.features = true;
        this.manuals = false;
        break;
      case 2:
        this.features = false;
        this.manuals = true;
        break;
      default:

        break;
    }
    
  }

  guardar(){
    /* this._productosService.nuevoProducto(this.producto)
    .subscribe(data=>{
      this.router.navigate(['/producto', data.name])
    },
    error=>console.error(error)); */
  }

}
