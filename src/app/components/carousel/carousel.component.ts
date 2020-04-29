import { Component, OnInit } from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import { HttpResponse } from '@angular/common/http';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {
  firsImage: String;
  secondImage: String;
  thirdImage: String;
  
  productos: HttpResponse<Producto[]>;

  constructor(private _productosService:ProductosService) {
    this._productosService.getImgProductosTop().subscribe(data =>{
      this.firsImage = data.body.reverse().pop();
      this.secondImage = data.body.reverse().pop();
      this.thirdImage = data.body.reverse().pop();
    })
   }

  ngOnInit() {
  }

}
