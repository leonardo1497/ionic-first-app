import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.scss']
})
export class ModalListComponent implements OnInit {
  listFormGroup: FormGroup;
  listItemFormGroup: FormGroup;
  id_list;
  type_list;
  photo;
  constructor( private formBuilder: FormBuilder,
              private modal: ModalController,
              private dbService: DatabaseService,
              private camera: Camera) { }

  ngOnInit() {
    this.listFormGroup = this.formBuilder.group({
      'name':['', Validators.required]

    });
    this.listItemFormGroup = this.formBuilder.group({
      'name':['', Validators.required],
      'description':['', Validators.required],
      'price':['', Validators.required]
    });
  }

  crearList(): void{
    console.log(this.listFormGroup.value);
    this.dbService.createList(this.listFormGroup.value.name).then(response =>{
     console.log(response)
     this.modal.dismiss();
    }).catch(e =>{
      console.log(e);
    })
  }

  crearItem():void{
    this.dbService.createItemList(this.id_list,this.listItemFormGroup.value.name,
                                  this.listItemFormGroup.value.description,
                                  this.listItemFormGroup.value.price,this.photo).then(response =>{
                                    console.log(response);
                                    this.modal.dismiss();
                                  }).catch(e=>{
                                    console.log(e);
                                  })
    
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
