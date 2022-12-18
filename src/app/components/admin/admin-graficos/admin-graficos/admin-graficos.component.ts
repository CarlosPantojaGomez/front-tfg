import { Component, OnInit , Input, SimpleChanges} from '@angular/core';
import { Bill } from 'src/app/interfaces/bill.interface';
import { DataSet } from 'src/app/interfaces/dataset.interface';
import { Producto } from 'src/app/interfaces/producto.interface';
import { Project } from 'src/app/interfaces/project.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { BillService } from 'src/app/services/bill.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-admin-graficos',
  templateUrl: './admin-graficos.component.html',
  styleUrls: ['./admin-graficos.component.css']
})
export class AdminGraficosComponent implements OnInit {

  @Input() change: number;
  productosView: boolean;
  proyectosView: boolean;
  tareasView: boolean;

  productos: Array<Producto>;
  proyectos: Array<Project>;
  tareas: Array<Task>;
  
  /* Graficas productos */
  datasetsProductos: Array<DataSet> = new Array<DataSet>();
  showDatasetsProductos: boolean;
  datasetBeneficios: Array<DataSet> = new Array<DataSet>();
  showDatasetsBeneficios: boolean;
  datasetRates: Array<DataSet> = new Array<DataSet>();
  showDatasetsRates: boolean;

  /* Graficas proyectos */
  datasetNumTareasPorProyecto: Array<DataSet> = new Array<DataSet>();
  
  numProyectosFinalizados: number = 0;
  numProyectosSinFinalizar: number = 0;

  /* Graficas tareas */
  
  numTareasPorDesarrollar: number = 0;
  numTareasEnDesarrollo: number = 0;
  numTareasParaVerificar: number = 0;
  numTareasTerminadas: number = 0;

  numTareasOnTime: number = 0;
  numTareasCaducadas: number = 0;
  showCaducados: boolean;
  showTareasPorTipos: boolean;


  basicData: any;
  basicData2: any;
  basicData3: any;

  basicData4: any;
  basicData5: any;

  
  basicData6: any;
  basicData7: any;

  
  labelsProducts: Array<string> = [];

  basicOptions: any;
  horizontalOptions: any;
  chartOptions: any;

  constructor(
    private productService: ProductosService,
    private projectervice: ProjectService,
    private taskService: TaskService,
    private billService: BillService
  ) { }

  ngOnInit(): void {
    
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.change.currentValue);
    console.log(changes.currentValue);
    
    if(changes.change.currentValue > 1){

      this.load();
    }
  } 

  protected load(){
    this.numProyectosFinalizados = 0;
    this.numProyectosSinFinalizar = 0;
    this.numTareasPorDesarrollar = 0;
    this.numTareasEnDesarrollo = 0;
    this.numTareasParaVerificar = 0;
    this.numTareasTerminadas = 0;
    this.numTareasOnTime = 0;
    this.numTareasCaducadas = 0;

    this.datasetNumTareasPorProyecto = new Array<DataSet>();
    this.datasetRates = new Array<DataSet>();
    this.datasetsProductos = new Array<DataSet>();
    this.datasetBeneficios = new Array<DataSet>();

    this.productosView = true;
    this.proyectosView = false;
    this.tareasView = false;

    this.showDatasetsProductos = false;
    this.showDatasetsBeneficios = false;
    this.showDatasetsRates = false;
    this.showTareasPorTipos = false;
    this.showCaducados = false;
    
    this.projectervice.getProjects().subscribe(data =>{
      this.proyectos=data.body;

      this.proyectos.forEach((element,index)=>{
        this.datasetNumTareasPorProyecto.push(this.buildDataSetForTaskPerProject(element));
        this.checkIfFinish(element);
      });

      this.basicData5 = {
        labels: ['Finalizados','Sin finalizar'],
        datasets: [
            {
                data: [this.numProyectosFinalizados, this.numProyectosSinFinalizar],
                backgroundColor: [
                  "#66BB6A",
                  "#FF5233"
                ],
                hoverBackgroundColor: [
                  "#81C784",
                  "#FF7259"
                ]
            }
        ]
      };
      
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

    this.taskService.getTasks().subscribe(data =>{
      this.tareas=data.body;

      this.tareas.forEach((element,index)=>{
        this.checkTipoTarea(element);
        this.checkTareaCaducada(element);
      });

      this.basicData6 = {
        labels: ['Para desarrollar', 'En desarrollo', 'Para verificar', 'Terminadas'],
        datasets: [
            {
                data: [this.numTareasPorDesarrollar, this.numTareasEnDesarrollo, this.numTareasParaVerificar, this.numTareasTerminadas],
                backgroundColor: [
                  "#FF5233",
                  "#ebedef",
                  "#495057",
                  "#66BB6A"
                ],
                hoverBackgroundColor: [
                  "#FF7259",
                  "#66BB6A",
                  "#FF5233",
                  "#81C784",
                ]
            }
        ]
      };

      this.basicData7 = {
        labels: ['A tiempo', 'Fuera de tiempo'],
        datasets: [
            {
                data: [this.numTareasOnTime, this.numTareasCaducadas],
                backgroundColor: [
                  "#66BB6A",
                  "#FF5233"
                ],
                hoverBackgroundColor: [
                  "#81C784",
                  "#FF7259"
                ]
            }
        ]
      };

      this.showCaducados = true;
      this.showTareasPorTipos = true;
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

    /* Proyectos */
    this.basicData4 = {
      labels: ['Número de tareas'],
      datasets: this.datasetNumTareasPorProyecto
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

    this.chartOptions = {
      plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
      }
    };

    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
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

  buildDataSetForTaskPerProject(project: Project): DataSet{
    
    var tasks = new Array<number>();
    tasks.push(project.tasks.length);

    const dataSet={
      label: project.name,
      backgroundColor: this.getRandomColor(),
      data: tasks
    };

    return dataSet;
  }

  checkIfFinish(project: Project){
    
    if(project.tasks.length > 0){
      var foo = project.tasks.filter(obj => {
        return obj.state != 3
      });
  
      
  
      if(foo.length > 0){
        this.numProyectosSinFinalizar++;
      } else {
        this.numProyectosFinalizados++;
      }
    } else {
      
      this.numProyectosSinFinalizar++;
    }
    
  }

  checkTipoTarea(tarea: Task){
    switch (tarea.state) {
      case 0:
        this.numTareasPorDesarrollar++;
        break;
      case 1:
      
        this.numTareasEnDesarrollo++;
        break;
      case 2:
      
        this.numTareasParaVerificar++;
        break;
      case 3:
      
        this.numTareasTerminadas++;
        break;
    
      default:
        break;
    }
  }

  checkTareaCaducada(tarea: Task){

    if (new Date().getTime() > new Date(tarea.endDate).getTime()) {
      this.numTareasCaducadas++;
    } else {
      this.numTareasOnTime++;
    }
    
    
  }

}
