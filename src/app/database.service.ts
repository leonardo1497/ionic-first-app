import { Injectable } from '@angular/core';
import {SQLiteObject } from '@ionic-native/sqlite/ngx';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: SQLiteObject = null;

  constructor() { }

  setDatabase(db: SQLiteObject){
    console.log(db);
    if(this.db === null){
      this.db = db;
    }
  }

  createTables(){
    console.log("tablas")
    let query : string = "CREATE TABLE IF NOT EXISTS list(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), date DATE, status INTEGER); CREATE TABLE IF NOT EXISTS list_items(id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE, name VARCHAR(100), description TEXT, price FLOAT, image TEXT)";
    return this.db.executeSql(query, []);
  }

  getAllList(){
    let query = "select * from list";
    return this.db.executeSql(query,[]).then(items =>{
      let list = [];
      for (let index = 0; index < items.rows.length; index++) {
        list.push(items.rows.item(index));
      }
      return Promise.resolve(list);
    }).catch(e=>{
      console.log(e);
      Promise.reject();
    });

  }

  getAllItemList(){

  }

  createList(name:String){
    let query = "INSERT INTO list(name, date, status) VALUES(?, date('now','localtime'), '0')";
    return this.db.executeSql(query,[name]);
  }

  createItemList(){

  }

  updateList(idList,name,status){
    let  query ="update list set name = ?, status = ? where id = ?";
    return this.db.executeSql(query,[name,status,idList]);

  }

  updateItemList(){

  }

  deleteList(idList){
    let  query ="delete from list where id = ?";
    return this.db.executeSql(query,[idList]);
  }
}
