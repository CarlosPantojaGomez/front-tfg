import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticia } from 'src/app/interfaces/noticia.interface';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styles: []
})
export class NoticiaComponent implements OnInit {

  public noticia: Noticia;
  id:string;

  constructor(private _noticiasService:NoticiasService,
    private router:Router,
    private route:ActivatedRoute) { 
      this.route.params.subscribe( parametros =>{

        this.id = parametros['id']; 

        if(this.id!=="nuevo"){
          this._noticiasService.getNoticia(this.id).subscribe(noticia => this.noticia = noticia.body);
          
        }


      });
  }
  

  ngOnInit() {
  }

}
