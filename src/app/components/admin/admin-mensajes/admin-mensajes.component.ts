import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Mail } from 'src/app/interfaces/mail.interface';
import { Mensaje } from 'src/app/interfaces/mensaje.interface';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-admin-mensajes',
  templateUrl: './admin-mensajes.component.html',
  styleUrls: ['./admin-mensajes.component.css']
})
export class AdminMensajesComponent implements OnInit {

  @Output() loadNonReadCount = new EventEmitter<number>();

  mensajesRecibidos: Mail[];
  mensajesEscritos: Mail[];
  header: string;
  buttonNewMensaje: string;
  mensajeId: number;

  creatingMensaje: boolean;
  editingMensaje: boolean;

  escritos: boolean;
  recibidos: boolean;
  writer: boolean;

  constructor(
    private mailService: MailService) { }

  ngOnInit() {

    this.escritos = true;
    this.getmensajes();
    
    this.creatingMensaje = false;
    this.editingMensaje = false;
    this.buttonNewMensaje = 'Escribir Mensaje';
  }

  

  protected loadData(mail: Mail) {
  }

  protected onError(errorMessage: string) {
    
  }

  protected loadState(create: boolean, edit: boolean) {
    this.creatingMensaje = create;
    this.editingMensaje = edit;

    if(!create && !edit){
      this.getmensajes();
    }
  }

  protected editProduct(id: number) {
    this.creatingMensaje = false;
    this.editingMensaje = true;
  }
  
  protected changeHeader(tag: string) {
    this.header = tag;
  }

  protected deleteProduct(tag: string) {
    this.header = tag;
  }

  refresh(event: any){
    this.getmensajes();
  }

  protected getmensajes(){
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      this.mailService.getReceivedMailsByUserId(JSON.parse(sessionStorage.getItem('currentUser')).id).subscribe(data =>{
        this.mensajesRecibidos=data.body;

        this.mailService.getWroteMailsByUserId(JSON.parse(sessionStorage.getItem('currentUser')).id).subscribe(data =>{
          this.mensajesEscritos=data.body;
          
          this.loadNonReadCount.emit(this.mensajesRecibidos.filter(obj => {
            return obj.saw == false
          }).length);
        });
      });
    }
  }

  verMensaje(indice: number){
    this.mensajeId = this.mensajesRecibidos[indice].id;
    this.writer = false;
    this.creatingMensaje = false;
    this.editingMensaje = true;
    
  }

  verMensajeRecibido(indice: number){
    this.mensajeId = this.mensajesEscritos[indice].id;
    this.writer = true;
    this.creatingMensaje = false;
    this.editingMensaje = true;
  }

  public onClickMe(option: number) {
    switch (option) {
      case 1:
        this.escritos = true;
        this.recibidos = false;
        break;
      case 2:
        this.escritos = false;
        this.recibidos = true;
        break;
      case 3:
      default:

        break;
    }
    
  }


}
