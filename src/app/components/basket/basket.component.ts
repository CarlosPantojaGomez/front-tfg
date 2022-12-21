import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Basket } from 'src/app/interfaces/basket.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { BasketService } from 'src/app/services/basket.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: Basket;

  user: Usuario;
  
  public payPalConfig ? : IPayPalConfig;

  constructor(
    private basketService: BasketService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));

      this.basketService.getBasketByUser(this.user.id).subscribe(data =>{
        this.basket = data.body;

        this.initConfig();
        
      });
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.basket.amount.toString(10),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.basket.amount.toString(10)
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: this.basket.amount.toString(10),
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            //this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            //this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            //this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            //this.resetStatus();
        },
    };
  }

  eliminarProducto(product: Producto){
    
    const request={
      product: product,
      user: JSON.parse(sessionStorage.getItem('currentUser')),
    };

    this.subscribeToSaveResponse(this.usuarioService.removeProductFromUserBasket(request));
    
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError());
  }
  protected onSaveSuccess(res: any) {
    console.log("ERROR");
  }
  protected onSaveError() {
    console.log("ERROR");
  }
}
