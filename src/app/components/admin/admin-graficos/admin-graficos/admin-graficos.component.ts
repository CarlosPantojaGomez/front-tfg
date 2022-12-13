import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/interfaces/bill.interface';
import { DataSet } from 'src/app/interfaces/dataset.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Project } from 'src/app/interfaces/project.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { BillService } from 'src/app/services/bill.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-admin-graficos',
  templateUrl: './admin-graficos.component.html',
  styleUrls: ['./admin-graficos.component.css']
})
export class AdminGraficosComponent implements OnInit {

  productosView: boolean;
  proyectosView: boolean;
  tareasView: boolean;

  productos: Array<Producto>;
  proyectos: Array<Project>;
  tareas: Array<Task>;
  
  datasetsProductos: Array<DataSet> = new Array<DataSet>();
  showDatasetsProductos: boolean;
  datasetBeneficios: Array<DataSet> = new Array<DataSet>();
  showDatasetsBeneficios: boolean;
  datasetRates: Array<DataSet> = new Array<DataSet>();
  showDatasetsRates: boolean;
  
  basicData: any;
  basicData2: any;
  basicData3: any;

  
  labelsProducts: Array<string> = [];

  basicOptions: any;

  constructor(
    private productService: ProductosService, 
    private projectervice: ProjectService, 
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.productosView = true;

    this.showDatasetsProductos = false;
    this.showDatasetsBeneficios = false;
    
    this.projectervice.getProjects().subscribe(data =>{
      this.proyectos=data.body;

      /* this.proyectos.forEach((element,index)=>{
        this.buildDataSetForProduct(element);
      }); */
    });

    this.productService.getProductos().subscribe(data =>{
      this.productos=data.body;

      this.productos.forEach((element,index)=>{
        this.datasetRates.push(this.buildProductsRate(element));
        this.datasetsProductos.push(this.buildDataSetForProductSales(element));
      });

      this.showDatasetsProductos = true;
      this.showDatasetsRates = true;
    });

    this.billService.getBills().subscribe( data => {
      this.datasetBeneficios.push(this.buildDataSetForProfits(data.body));
      this.showDatasetsBeneficios = true;
    });

    this.basicData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: this.datasetsProductos
    };

    this.basicData2 = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: this.datasetBeneficios
    };

    this.basicData3 = {
      labels: ['Valoración (Sobre 5)'],
      datasets: this.datasetRates
    };

    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#ebedef'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y: {
              ticks: {
                  color: '#ebedef'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          }
      }
    };
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.productosView = true;
        this.proyectosView = false;
        this.tareasView = false;
        break;
      case 2:
        this.productosView = false;
        this.proyectosView = true;
        this.tareasView = false;
        break;
      case 3:
        this.productosView = false;
        this.proyectosView = false;
        this.tareasView = true;
        break;
      default:
        break;
    }
  }

  public getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  buildDataSetForProductSales(product: Producto): DataSet{
    
    var bills = new Array<Bill>();
    var sells = new Array<number>();

    this.billService.getBillsByProduct(product.id).subscribe(data =>{
      
      var month = 1;

      bills = data.body;
      while(month < 13){
        
        sells.push(bills.filter(obj => { 
          var dt = new Date(obj.saleDate);
          
          return dt.getMonth() == month && dt.getFullYear() == (new Date()).getFullYear() }).length);
          
          month++;
        }
    });

    const dataSet={
      label: product.name,
      backgroundColor: this.getRandomColor(),
      data: sells
    };

    return dataSet;
  }

  buildDataSetForProfits(bills: Array<Bill>): DataSet{
    
    var month = 1;
    var sells = new Array<number>();

    while(month < 13){
        var facturasDelMes = bills.filter(obj => { 
          var dt = new Date(obj.saleDate);
          
          return dt.getMonth() == month && dt.getFullYear() == (new Date()).getFullYear() });

        var suma = 0;

        facturasDelMes.forEach(element => {
          suma += element.grossValue;
        });

      sells.push(suma);
      month++;
    }

    const dataSet={
      label: "Ventas Totales",
      backgroundColor: this.getRandomColor(),
      data: sells
    };

    return dataSet;
  }

  buildProductsRate(product: Producto): DataSet{
    var sells = new Array<number>();
    console.log(product);
    
    var rate = 0;
    if(product.rates != null && product.rates != undefined && product.rates.length > 0){
      product.rates.forEach(element => {
        rate += element.rate;
      });
    }

    if(rate > 0){
      rate = rate / product.rates.length;
    }

    sells.push(rate);

    const dataSet={
      label: product.name,
      backgroundColor: this.getRandomColor(),
      data: sells
    };

    return dataSet;
  }

}
