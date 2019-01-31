import { Component, OnInit } from '@angular/core';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  photo : string='assets/img/avatar.png';
  constructor(
    private camera: Camera
  ){

  }

  options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: true
  }

  takePhoto(){
    console.log('take photo')
    this.camera.getPicture(this.options).then((imageData) => {
      console.log(imageData);
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err)  
    });
  }
}
