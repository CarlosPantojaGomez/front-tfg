import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  nonreadMensjaes: number = 0;
  showActividades: number = 0;
  constructor() { }

  ngOnInit() {
  }

  changeHeader() {
    
  }

  loadNonReadCount(event: number){
    console.log(event);
    this.nonreadMensjaes = event;
  }

  goToHome(){
    this.showActividades++;
    
  }
}
