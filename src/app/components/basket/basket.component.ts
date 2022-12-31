import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Basket } from 'src/app/interfaces/basket.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { BasketService } from 'src/app/services/basket.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket: Basket;

  user: Usuario;
  
  result: Array<any> = [];
  
  public payPalConfig ? : IPayPalConfig;

  constructor(
    private basketService: BasketService,
    private alertService: AlertService,
    private usuarioService: UsuariosService,
    private router: Router
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
    const paypalProducts = this.createProducts();

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
                items: this.result
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
            this.compraRealizada(data);
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

  createProducts(): any{
    this.result = [];

    this.basket.products.forEach((product)=>{

      var elem = {
        name: product.name,
        quantity: '1',
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'EUR',
          value: product.price.toString(10),
        },
      }
      this.result.push(elem);
    });

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
    this.usuarioService.refreshUser.emit();
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));

      this.basketService.getBasketByUser(this.user.id).subscribe(data =>{
        this.basket = data.body;
        
    this.usuarioService.refreshUser.emit();
      });
    }
  }
  protected onSaveError() {
    console.log("ERROR");
  }

  comprar(){
    this.compraRealizada(null)
  }

  protected compraRealizada(details: any) {
    const request = {
      address_line_1: details?.payer?.address?.address_line_1,
      address_line_2: details?.payer?.address?.address_line_2,
      admin_area_1: details?.payer?.address?.admin_area_1,
      admin_area_2: details?.payer?.address?.admin_area_2,
      country_code: details?.payer?.address?.country_code,
      postal_code: details?.payer?.address?.postal_code,
      email_address: details?.payer?.email_address,
      name: details?.payer?.name?.given_name,
      surname: details?.payer?.name?.surname,
      national_number: details?.payer?.phone?.phone_number?.national_number,
      basket: this.basket
    }

    this.basketService.purchase(request).subscribe(data =>{
      this.basket = data.body;

      this.alertService.showAlert("Compra realizada correctamente. Productos disponibles desde el perfil de usuario o del producto");
      this.usuarioService.refreshUser.emit();
      this.initConfig();
      
    });
  }

  navigateProductos(){
    this.router.navigate(['/productos']);
  }
}
