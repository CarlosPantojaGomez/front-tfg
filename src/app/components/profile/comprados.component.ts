import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/interfaces/bill.interface';
@Component({
  selector: 'app-comprados',
  templateUrl: './comprados.component.html'
})
export class CompradosComponent implements OnInit {

  @Input() id: string;
  usuario: Usuario;
  bill: Bill;
  show: boolean = false;
  productos: Producto[];

  constructor(
    private productosService: ProductosService,
    private billService: BillService,
    private router: Router,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.usuarioService.getusuario(this.id)
        .subscribe(
          (res: HttpResponse<Usuario>) => this.loadData(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    
  }
  
  protected loadData(usuario: Usuario) {
    
    this.usuario = usuario;
    this.productos = this.usuario.productsBought;
    this.show = true;
  }
  
  protected onError(errorMessage: string) {
    
  }

  downloadProduct(productId: number){
    this.productosService.getProductFile(productId.toString(10)).subscribe(data =>{
      data.body;
      const src = data.body.data;
      const link = document.createElement("a")
      link.href = src
      link.download = data.body.name
      link.click()

      link.remove()
    })
  }

  downloadManuals(productId: number){
    this.productosService.getProductManuals(productId.toString(10)).subscribe(data =>{
      
      data.body.forEach((element,index)=>{
        const src = element.file.data;
        const link = document.createElement("a")
        link.href = src
        link.download = element.name
        link.click()

        link.remove()
      });
      
    });
  }

  downloadBill(product: Producto) {

    this.billService.getBillByProductAndUser(product.id, this.usuario.id).subscribe(data =>{
     
      

      var doc = new jsPDF();
      var col = ["Cant", "Producto", "Precio"];
      var itemNew = [];

      data.body.products.forEach((element,index)=>{
        itemNew.push({
          Cant: '1',
          Producto: element.name,
          Precio: element.price.toString(10)
        });
      });

      var doc = new jsPDF();
      doc.setFontSize(22);
      doc.text('TFG (Empresa de prueba)',20, 20);
      
      doc.setFontSize(10);
      doc.text('1912 Calle Del Invento',20, 30);
      doc.text('Málaga, España 29010',20, 35);

      
      doc.text(data.body.address_line_1 != null ? data.body.address_line_1: "Sin dirección 1 conocida",20, 55);
      doc.text(data.body.address_line_2 != null ? data.body.address_line_2: "Sin dirección 1 conocida",20, 60);
      doc.text(data.body.admin_area_1 != null ? data.body.admin_area_1: "Sin dirección 1 conocida",20, 65);
      
      doc.text(data.body.billNumber != null ? data.body.billNumber: "Sin Número Factura",140, 50);
      doc.text(data.body.id != null ? data.body.id.toString(10): "Sin Número pedido",140, 60);
      doc.text(data.body.saleDate != null ? new Date(data.body.saleDate).toDateString(): "Sin fecha conocida",140, 70);
      
      doc.setFontSize(12);
      doc.text('Facturar a',20, 50);

      doc.text('Número Factura',100, 50);
      doc.text('Número pedido',100, 60);
      doc.text('Fecha de facturación',100, 70);

      doc.table(20,100, itemNew ,col, { autoSize: true });
      doc.save('Test.pdf');
      
    });

  }

  verproducto(key:string){
    this.router.navigate(['/producto', key]);
  }

}