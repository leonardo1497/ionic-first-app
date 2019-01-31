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
  precioTotal: string;

  constructor(
    private modal: ModalController,
    private dbService : DatabaseService,
    public actionSheet: ActionSheetController
  ){}

  async openModal(type){
    const modal = await this.modal.create({
      component: ModalListComponent,
      componentProps: {
        type_list: type
     }
    });
    modal.onDidDismiss().then(()=>{
      this.refreshPage();
      console.log("refrescar");
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
      this.refreshPage();
    }).catch(e=>{
      console.log(e)
    });
    return await modal.present();
  }

  ngOnInit(){
    this.refreshPage();
  }

  obtenerTotal(id){
    console.log()
    this.dbService.sumItem(id).then(response=>{
      if( response.suma!=null){
        this.precioTotal = response.suma;
      }else{
        this.precioTotal = "0";
      }  
      console.log("SUMA ",this.precioTotal);
    }).catch(e=>{
      console.log(e);
    });
    return this.precioTotal;
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
          this.openModalMod(idList,"list");
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
        },{
          text: 'Finalizar',
          icon: 'checkmark',
          handler: () => {
            this.dbService.endList(idList);
            this.refreshPage();
          }

      }]
    });
    await actionSheet.present();
  }
}
