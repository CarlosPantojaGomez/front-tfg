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
  descarga: boolean;
  nuevo:boolean = false;
  id: string;
  productFound:boolean = false;


  constructor (
    private _productosService: ProductosService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe( parametros =>{
        this.id = parametros['id']; 
      });
  }

  ngOnInit() {
    this._productosService.getProducto(this.id).subscribe(data =>{
      console.log(data);
      
      this.producto=data.body;
      console.log(this.producto);
      
      this.productFound = true;
    });
    this.features = true;
    this.manuals = false;
    this.descarga = false;
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.features = true;
        this.manuals = false;
        this.descarga = false;
        break;
      case 2:
        this.features = false;
        this.manuals = true;
        this.descarga = false;
        break;
      case 3:
        this.features = false;
        this.manuals = false;
        this.descarga = true;
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
