import { Component, OnInit , Input, SimpleChanges} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Input() product: Producto;
  @Input() id: number;

  identificado:boolean = false;
  comprado:boolean = false;

  usuario: Usuario;
  
  constructor() { }

  ngOnInit() {
    if(this.id != undefined && this.id != null){
      if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){

        this.usuario = JSON.parse(sessionStorage.getItem('currentUser'));
        this.identificado = true;
  
        if(this.usuario.productsBought != undefined && this.usuario.productsBought != null && this.usuario.productsBought.length > 0){
          const prod= this.usuario.productsBought.find(obj => {
            return obj.id === this.id
          });

          if(prod != null && prod != undefined){
            this.comprado = true;
          }
        }
        
      }
    }
    
  }

  downloadProduct() {

    const src = this.product.file.data;
    const link = document.createElement("a")
    link.href = src
    link.download = this.product.file.name
    link.click()

    link.remove()
  }

}
