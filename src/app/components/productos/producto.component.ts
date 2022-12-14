import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';

import {ProductosService} from '../../services/productos.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Image } from 'src/app/interfaces/image.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {
  
  @Input() id: string;

  producto: Producto;
  features: boolean;
  manuals: boolean;
  descarga: boolean;
  vistaTrabajador:boolean = false;
  productFound:boolean = false;

  mainImage: Image;
  mainImages: Array<Image> = [];

  constructor (
    private _productosService: ProductosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    if(this.id == undefined){
      
      this.route.params.subscribe( parametros =>{
        this.id = parametros['id']; 
      });

    }else {
      this.vistaTrabajador = true;
    }
    
    this._productosService.getProducto(this.id).subscribe(data =>{
      this.producto = data.body;
      console.log(this.mainImages);
      this.mainImages = data.body.images.filter(obj => {
        return obj.imageType == 2
      });
      
      if(this.mainImages.length > 0){
        this.mainImage = this.mainImages[0];
        console.log(this.mainImages);
        this.mainImages.splice(0, 1);
        console.log(this.mainImages);
      }
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
