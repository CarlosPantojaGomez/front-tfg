import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {ChatService} from '../../services/chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent{

  mensaje:string="";
  elemento: any;

  public items: Observable<any[]>;


  constructor(public _cs: ChatService) {

    this._cs.cargarMensajes()
       .subscribe(()=>{

        setTimeout(()=>{
          this.elemento.scrollTop= this.elemento.scrollHeight;
        },20)
         
       });
  }

  ngOnInit(){
    this.elemento=document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    console.log(this.mensaje);

    if(this.mensaje.length === 0){
      return;
    }

    this._cs.agregarMensaje(this.mensaje).then(()=>this.mensaje="").catch((err)=>console.error('Error al enviar',err));
  }
  

  
}
