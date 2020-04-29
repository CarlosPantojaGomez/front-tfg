import { Injectable, Output,EventEmitter } from '@angular/core';

@Injectable()
export class EventManagerService {



@Output() event$:EventEmitter<boolean>=new EventEmitter();

  constructor() { 

  }

  setEventLoggedEmitter(enable:boolean) {
      this.event$.next(enable);
  }

  getEventLoggedEmitter() {
     return this.event$;
  }  

}