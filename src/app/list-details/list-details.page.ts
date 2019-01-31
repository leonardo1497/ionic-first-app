import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { ModalListComponent } from '../modal-list/modal-list.component';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ModalModComponent } from '../modal-mod/modal-mod.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  list_items: any;
  id;
  statusList;
  constructor(
    private modal: ModalController,
    private dbService : DatabaseService,
    private route: ActivatedRoute,
    public actionSheet: ActionSheetController
  ) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    this.refreshPageItems(this.id);
  }
  async openModal(type){
    const modal = await this.modal.create({
      component: ModalListComponent,
      componentProps: {
        type_list: type,
        id_list: this.id
     }
    });
    modal.onDidDismiss().then(()=>{
      this.refreshPageItems(this.id);
    }).catch(e=>{
      console.log(e)
    });
    return await modal.present();
  }

  async openModalMod(idList,type){
    const modal = await this.modal.create({
      component: ModalModComponent,
      componentProps: {
        idListMod: idList,
        type_list: type
     }
    });
    modal.onDidDismiss().then(()=>{
      this.refreshPageItems(this.id);
    }).catch(e=>{
      console.log(e)
    });
    return await modal.present();
  }

  refreshPageItems(id){
    this.dbService.getStatus(this.id).then(response=>{
      this.statusList=response.status;
    }).catch(e=>{
      console.log(e)
    });
    this.dbService.getAllItemList(id).then(response =>{
      console.log(response)
      this.list_items = response;
    }).catch(e =>{
      console.log(e);
    })
  }

  async presentActionSheetItem(idList) {
    console.log("estatus ",this.statusList)
    if(this.statusList==0){
      const actionSheet = await this.actionSheet.create({
        header: 'Opciones',
        buttons: [{
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.dbService.deleteItemList(idList);
            this.refreshPageItems(this.id);
            console.log('Delete clicked');
          }
        }, {
          text: 'Modificar',
          icon: 'create',
          handler: () => {
            this.openModalMod(idList,"item");
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
  }

}
