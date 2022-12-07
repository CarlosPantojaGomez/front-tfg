import { Component, OnInit, Input} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeUrl,
  SafeStyle
} from '@angular/platform-browser';
import { NO_PROFILE_PICTURE_2 } from 'src/app/helpers/img.constants';
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  @Input() imagePatch: string;
  @Input() profileSize: number;
  imageShow: any;
  imageSize: any;


  constructor(private sanitization:DomSanitizer) { }

  ngOnInit() {

    if(this.imagePatch == undefined || this.imagePatch == null){
      this.imageShow = NO_PROFILE_PICTURE_2;
    } else {
      this.imageShow = this.imagePatch;
    }

    if(this.profileSize == undefined || this.profileSize == null || this.profileSize == 0){
      
    }

  }

}
