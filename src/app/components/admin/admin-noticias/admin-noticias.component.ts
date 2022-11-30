import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/interfaces/noticia.interface';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-admin-noticias',
  templateUrl: './admin-noticias.component.html',
  styleUrls: ['./admin-noticias.component.css']
})
export class AdminNoticiasComponent implements OnInit {

  noticias: Noticia[];
  header: string;
  buttonNewNoticia: string;

  creatingNoticia: boolean;
  editingNoticia: boolean;

  noticiaId: number;

  constructor(
    private noticiasService: NoticiasService) { }

  ngOnInit() {

    this.noticiasService.getNoticias().subscribe(data =>{
      this.noticias=data.body;
    });

    this.creatingNoticia = false;
    this.editingNoticia = false;
    this.buttonNewNoticia = 'Nueva Noticia';
  }
  
  protected loadState(create: boolean, edit: boolean) {
    this.creatingNoticia = create;
    this.editingNoticia = edit;

    if(!create && !edit){
      this.noticiasService.getNoticias().subscribe(data =>{
        this.noticias=data.body;
      });
    }
  }

  protected editNoticia(id: number) {
    this.noticiaId = id;
    this.creatingNoticia = false;
    this.editingNoticia = true;
  }

}
