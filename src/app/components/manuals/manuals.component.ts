import { Component, OnInit , Input, SimpleChanges} from '@angular/core';
import { ManualEntity } from 'src/app/interfaces/manual.interface';

@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.css']
})
export class ManualsComponent implements OnInit {

  @Input() manuals: Array<ManualEntity>;

  constructor() { }

  ngOnInit() {
    
  }

  downloadManual(id: number) {
    const manual = this.manuals.find(obj => {
      return obj.id === id
    })

    const src = manual.file.data;;
    const link = document.createElement("a")
    link.href = src
    link.download = manual.name
    link.click()

    link.remove()
  }

}
