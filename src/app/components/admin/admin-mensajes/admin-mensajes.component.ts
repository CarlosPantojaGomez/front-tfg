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

  mensajes: Mail[];
  header: string;
  buttonNewMensaje: string;
  mensajeId: number;

  creatingMensaje: boolean;
  editingMensaje: boolean;

  constructor(
    private mailService: MailService) { }

  ngOnInit() {
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
      this.mailService.getMailsByUserId(JSON.parse(sessionStorage.getItem('currentUser')).id).subscribe(data =>{
        this.mensajes=data.body;
        
        this.loadNonReadCount.emit(this.mensajes.filter(obj => {
          return obj.saw == false
        }).length);
      });
    }
  }

  verMensaje(indice: number){
    this.mensajeId = this.mensajes[indice].id;
    this.creatingMensaje = false;
    this.editingMensaje = true;
    
  }


}
