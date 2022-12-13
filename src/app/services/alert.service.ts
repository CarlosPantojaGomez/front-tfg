import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert: boolean;
  alertText: string = " ";

  constructor() { 
  }
  
  public showAlert(text: string) {
    this.alertText = text;
    this.alert = true;
    setTimeout(() => this.alert = false,2000);
  }
}
