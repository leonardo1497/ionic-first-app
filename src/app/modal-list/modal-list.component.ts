import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';



@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.scss']
})
export class ModalListComponent implements OnInit {
  listFormGroup: FormGroup;

  constructor( private formBuilder: FormBuilder,
              private modal: ModalController,
              private dbService: DatabaseService) { }

  ngOnInit() {
    this.listFormGroup = this.formBuilder.group({
      'name':['', Validators.required]

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

}
