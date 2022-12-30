import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoRate } from 'src/app/interfaces/ProductRate.interface';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Input() product: Producto;
  @Input() id: number;

  @Output() updateProductRate = new EventEmitter();

  identificado:boolean = false;
  comprado:boolean = false;
  showRate:boolean = false;

  usuario: Usuario;

  rate: ProductoRate;
  
  constructor(
    private productService: ProductosService,
    private alertService: AlertService,
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

            const rate = {
              rate: 0,
              product: this.product,
              rater: this.usuario,
            };

            this.rate = rate;
            this.comprado = true;

            this.productService.getProductRateForUser(this.id.toString(10), this.usuario.id.toString(10)).subscribe(data =>{
              console.log(data.body);
              if(data.body != null){
                this.rate = data.body;
              }
              this.showRate = true;
            });
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

  updateRate(){
    this.productService.saveRate(this.rate).subscribe(data =>{
      console.log(data.body);
      if(data.body != null){
        this.rate = data.body;
        this.alertService.showAlert("Producto valorado correctamente");
        
        this.updateProductRate.emit();
      }
    });
    
  }



}
