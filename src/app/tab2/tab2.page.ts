import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ModalListComponent } from '../modal-list/modal-list.component';
import { DatabaseService } from '../database.service';
import { ModalModComponent } from '../modal-mod/modal-mod.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  lists: any;
  txtStatus: string;
  cssStatus: string;

  constructor(
    private modal: ModalController,
    private dbService : DatabaseService,
    public actionSheet: ActionSheetController
  ){}

  async openModal(){
    const modal = await this.modal.create({
      component: ModalListComponent
    });
    modal.onDidDismiss().then(()=>{
      this.refreshPage();
      console.log("refrescar");
    }).catch(e=>{
      console.log(e)
    });
    return await modal.present();
  }
  async openModalMod(idList){
    const modal = await this.modal.create({
      component: ModalModComponent,
      componentProps: {
        idListMod: idList
     }
    });
    modal.onDidDismiss().then(()=>{
      this.refreshPage();
    }).catch(e=>{
      console.log(e)
    });
    return await modal.present();
  }

  ngOnInit(){
    this.refreshPage();
  }

  refreshPage(){
    this.dbService.getAllList().then(response =>{
      console.log(response)
      this.lists = response;
    }).catch(e =>{
      console.log(e);
    })

  }

  getStatus(id){
  if(id == 0){
    this.txtStatus = 'En proceso';
    this.cssStatus ='terminado';
  }else{
    this.txtStatus = 'Terminado';
    this.cssStatus = 'enproceso';
  }
  return this.txtStatus;
  }

  async presentActionSheet(idList) {
    const actionSheet = await this.actionSheet.create({
      header: 'Opciones',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.dbService.deleteList(idList);
          this.refreshPage();
          console.log('Delete clicked');
        }
      }, {
        text: 'Modificar',
        icon: 'create',
        handler: () => {
          this.openModalMod(idList);
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
