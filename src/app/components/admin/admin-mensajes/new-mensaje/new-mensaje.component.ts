import { Component, OnInit, Input, ElementRef, ViewChild ,Output, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MailService } from 'src/app/services/mail.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Mail } from 'src/app/interfaces/mail.interface';

@Component({
  selector: 'app-new-mensaje',
  templateUrl: './new-mensaje.component.html',
  styleUrls: ['./new-mensaje.component.css']
})
export class NewMensajeComponent implements OnInit {


  @Input() id: number;
  @Input() mensajeId: number;
  @Output() goBack = new EventEmitter();

  buttonDone: string;
  header: string;
  usuarios: Usuario[];
  
  read: boolean;
  mensaje: Mail;

  editForm = this.fb.group({
    receiverName: [],
    subject: [],
    text: []
  });


  constructor(
    private fb: FormBuilder,
    private mailService: MailService,
    private userService: UsuariosService) { }

  ngOnInit() {
    this.read = false;
    
    this.buttonDone = 'Enviar';
    this.header = 'Nuevo mensaje';
    console.log(this.id);
    
    if(this.id != undefined){
      this.mailService.getMail(this.id.toString(10)).subscribe(data =>{
        console.log(data);
        
        this.read = true;
        this.mensaje = data.body;
        
        this.buttonDone = 'Guardar';
        this.header = 'Editar Producto';
        
      });
    }
  }

  onSearchReceiverChange(searchValue: string): void {  
    if(searchValue.length > 2){
      this.userService.findbyNickname(searchValue).subscribe(data =>{
        if (data.body.length > 0){
          this.usuarios = data.body;
        }else {
          this.usuarios = undefined;
        }
      });
    } else {
      this.usuarios = undefined;
    }
  }

  selectReceiver(i: number) {
    console.log(this.usuarios[i]);
    this.editForm.patchValue({
      receiverName: this.usuarios[i].nickname
    });
    
    this.usuarios = undefined;
    
  }

  save(){
    const mail = this.createFromForm();
    
    this.subscribeToSaveResponse(this.mailService.nuevoMail(mail));
  }

  private createFromForm(): Mail {
    var writerName = "";
    if(JSON.parse(sessionStorage.getItem('currentUser'))!= null){
      writerName = JSON.parse(sessionStorage.getItem('currentUser')).nickname
    }

    const mail={
      subject: this.editForm.get(['subject']).value,
      text: this.editForm.get(['text']).value,
      writerName: writerName,
      receiverName: this.editForm.get(['receiverName']).value
    };
    
    return mail;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    console.log('entra');
    
    this.goBack.emit();
  }
  protected onSaveError() {
    console.log("ERROR");
  }

}
