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
  noticias: boolean;
  vistaTrabajador:boolean = false;
  productFound:boolean = false;
  rate: number = 0;
  mainImage: Image;
  mainImages: Array<Image> = [];

  constructor (
    private _productosService: ProductosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rate = 0;
    if(this.id == undefined){
      
      this.route.params.subscribe( parametros =>{
        this.id = parametros['id']; 
      });

    }else {
      this.vistaTrabajador = true;
    }
    
    this._productosService.getProducto(this.id).subscribe(data =>{
      this.producto = data.body;

      this.mainImages = data.body.images.filter(obj => {
        return obj.imageType == 2
      });
      
      if(this.mainImages.length > 0){
        this.mainImage = this.mainImages[0];
        console.log(this.mainImages);
        this.mainImages.splice(0, 1);
        console.log(this.mainImages);
      }

      this._productosService.getProductRate(this.id).subscribe(data =>{
        this.rate = data.body;
        this.productFound = true;
      });

    });

    this.features = true;
    this.manuals = false;
    this.descarga = false;
    this.noticias = false;
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.features = true;
        this.manuals = false;
        this.descarga = false;
        this.noticias = false;
        break;
      case 2:
        this.features = false;
        this.manuals = true;
        this.descarga = false;
        this.noticias = false;
        break;
      case 3:
        this.features = false;
        this.manuals = false;
        this.descarga = true;
        this.noticias = false;
        break;
      case 4:
        this.features = false;
        this.manuals = false;
        this.descarga = false;
        this.noticias = true;
        break;
      default:

        break;
    }
    
  }

  updateProductRate(){
    this._productosService.getProductRate(this.id).subscribe(data =>{
      this.rate = data.body;
      this.productFound = true;
    });
  }

}
