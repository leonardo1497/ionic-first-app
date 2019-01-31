import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modal-mod',
  templateUrl: './modal-mod.component.html',
  styleUrls: ['./modal-mod.component.scss']
})
export class ModalModComponent implements OnInit {
  type_item;
  idListMod;
  datosItem:any;
  listModFormGroup: FormGroup;
  listItemModFormGroup: FormGroup;
  photo="";
  constructor(private formBuilder: FormBuilder,
              private modal: ModalController,
              private dbService: DatabaseService,
              private camera: Camera) { }

  ngOnInit() {
    this.listModFormGroup = this.formBuilder.group({
      'name':['', Validators.required]

    });
    this.listItemModFormGroup = this.formBuilder.group({
      'name':[''],
      'description':[''],
      'price':['']
    })
  }

  modList(): void{
    this.dbService.updateList(this.idListMod,this.listModFormGroup.value.name).then(response =>{
     console.log(response)
     this.modal.dismiss();
    }).catch(e =>{
      console.log(e);
    })
  }
  name;description;price;image;
  modItem(): void{
    this.dbService.updateItemList(this.idListMod,this.name,this.description,
      this.price,this.image).then(response =>{
        console.log(response)
        this.modal.dismiss();
       }).catch(e =>{
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

  dataModItem(): void{
    this.dbService.findItemById(this.idListMod).then(response=>{
      this.datosItem = response;
      this.name = response.name;
      this.description = response.description;
      this.price = response.price;
      this.image = response.image;
      if(this.listItemModFormGroup.value.name!=""){
        this.name =this.listItemModFormGroup.value.name;
      }
      if(this.listItemModFormGroup.value.description!=""){
        this.description =this.listItemModFormGroup.value.description;
      }
      if(this.listItemModFormGroup.value.price!=""){
        this.price = this.listItemModFormGroup.value.price;
      }
      if(this.photo!=""){
        this.image = this.photo;
      }
      this.modItem();
    }).catch(e=>{
      console.log(e);
    });
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
