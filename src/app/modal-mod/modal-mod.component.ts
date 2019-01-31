import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-modal-mod',
  templateUrl: './modal-mod.component.html',
  styleUrls: ['./modal-mod.component.scss']
})
export class ModalModComponent implements OnInit {
  idListMod;
  listModFormGroup: FormGroup;
  selectedStatus;
  constructor(private formBuilder: FormBuilder,
              private modal: ModalController,
              private dbService: DatabaseService) { }

  ngOnInit() {
    this.listModFormGroup = this.formBuilder.group({
      'name':['', Validators.required],
      'proceso':['1', Validators.required]

    });
  }

  modList(): void{
    console.log("ESTAAAAAAA"+this.listModFormGroup.get('proceso').value)
    let estatus=parseInt(this.listModFormGroup.value.proceso)
    console.log(estatus)
    this.dbService.updateList(this.idListMod,this.listModFormGroup.value.name,estatus).then(response =>{
     console.log(response)
     this.modal.dismiss();
    }).catch(e =>{
      console.log(e);
    })
  }


}
