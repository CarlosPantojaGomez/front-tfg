import { Component, OnInit , Input} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

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
  
  constructor(
    private usuarioService: UsuariosService
  ) { }

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

  addProduct(){
    
    const request={
      product: this.product,
      user: this.usuario,
    };

    this.subscribeToSaveResponse(this.usuarioService.addProductToUserBasket(request));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError());
  }
  protected onSaveSuccess(res: any) {
    this.usuarioService.refreshUser.emit();
  }
  protected onSaveError() {
    console.log("ERROR");
  }

}
