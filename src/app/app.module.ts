import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalListComponent } from './modal-list/modal-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite} from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database.service';
import { ModalModComponent } from './modal-mod/modal-mod.component';
import {Camera} from '@ionic-native/camera/ngx';



@NgModule({
  declarations: [AppComponent, ModalListComponent, ModalModComponent],
  entryComponents: [ModalListComponent,ModalModComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatabaseService,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
