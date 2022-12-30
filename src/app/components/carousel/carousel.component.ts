import { Component, OnInit } from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import { HttpResponse } from '@angular/common/http';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Image } from 'src/app/interfaces/image.interface';
import { NO_PRODUCT_PROFILE_PICTURE_2 } from 'src/app/helpers/img.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {

  loaded: boolean;
  
  producto: Producto;
  productos: Producto[];

  mainImage: Image;
  mainImages: Array<Image> = [];

  constructor(
    private router: Router,
    private _productosService:ProductosService
  ) {
    this._productosService.getImgProductosTop().subscribe(data =>{
      this.productos = data.body;
      
      this.productos[0].images = this.productos[0].images.filter(function( obj ) {
        return obj.imageType == 2;
      });
      
      var img = this.productos[0].images[Math.floor(Math.random() * this.productos[0].images.length)];
      if (img != undefined){
        this.mainImage = img;
      } else {
        const imgg={
          url: NO_PRODUCT_PROFILE_PICTURE_2
        };
        this.mainImage = imgg;
      }
      
      this.producto = this.productos[0];

      this.productos.splice(0, 1);
      this.productos.forEach((element, index)=>{
        element.images = element.images.filter(function( obj ) {
          return obj.imageType == 2;
        });

        var img = element.images[Math.floor(Math.random() * this.productos[0].images.length)];
        
        if (img != undefined){
          this.mainImages.push(img);
        }
        if (img != undefined){
          this.mainImages.push(img);
        } else {
          const imgg={
            url: NO_PRODUCT_PROFILE_PICTURE_2
          };
          this.mainImages.push(imgg);
        }
      });
      console.log(this.productos);
      
      this.loaded = true;
    })
   }

  ngOnInit() {
  }

  goToproduct(product: Producto){
    
    this.router.navigate(['/producto', product.id]);
  }

}
