import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import {Mensaje} from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats:Mensaje[]=[];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats',ref=>ref.orderBy('fecha','desc')
                                                                        .limit(5));

    return this.itemsCollection.valueChanges()
                               .map((mensajes:Mensaje[])=>{
                                 console.log(mensajes);

                                 this.chats=[];
                                 for(let mensaje of mensajes){
                                   this.chats.unshift(mensaje);
                                 }

                                 return this.chats;
                                 //this.chats=mensajes;
                               })
  }

  agregarMensaje(texto:string){
    let mensaje: Mensaje={
      nombre: 'Demo',
      mensaje: texto,
      fecha : new Date().getTime(),
      uid:'a'
    }

    return this.itemsCollection.add(mensaje);

  }

}


