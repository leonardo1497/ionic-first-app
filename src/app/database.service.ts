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
    let query: string = "CREATE TABLE IF NOT EXISTS list(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), date DATE, status INTEGER,total FLOAT)";
    let queryTwo: string = "CREATE TABLE IF NOT EXISTS list_items(id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, name VARCHAR(100), description TEXT, price FLOAT, image TEXT,FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE)";
    this.db.executeSql(query, []);
    return this.db.executeSql(queryTwo, []);
  }

  getAllList(){
    let query = "select list.id,list.name,date,status,sum(price) precio from list left join list_items on list.id = list_id group by list.id";
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

  getAllItemList(id){
    let query = "select * from list_items where list_id = ?";
    return this.db.executeSql(query,[id]).then(items =>{
      let list_items = [];
      for (let index = 0; index < items.rows.length; index++) {
        list_items.push(items.rows.item(index));
      }
      return Promise.resolve(list_items);
    }).catch(e=>{
      console.log(e);
      Promise.reject();
    });

  }

  createList(name:String){
    let query = "INSERT INTO list(name, date, status) VALUES(?, date('now','localtime'), '0')";
    return this.db.executeSql(query,[name]);
  }

  createItemList(idList,name,description,price,image){
    let query = "INSERT INTO list_items(list_id, name, description,price,image) VALUES(?,?,?,?,?)";
    return this.db.executeSql(query,[idList,name,description,price,image]);
  }

  updateList(idList,name){
    let  query ="update list set name = ? where id = ?";
    return this.db.executeSql(query,[name,idList]);

  }

  endList(idList){
    let  query ="update list set status = 1 where id = ?";
    return this.db.executeSql(query,[idList]);
  }

  updateItemList(idItem,name,description,price,image){
    let  query ="update list_items set name = ?, description = ?, price= ?, image=? where id = ?";
    return this.db.executeSql(query,[name,description,price,image,idItem]);
  }

  deleteList(idList){
    let  query ="delete from list where id = ?";
    return this.db.executeSql(query,[idList]);
  }

  findItemById(id){
    let query = "select * from list_items where id = ?";
    return this.db.executeSql(query,[id]).then(items=>{
      let list_items;
      list_items =items.rows.item(0);
      return Promise.resolve(list_items);
    }).catch(e=>{
      console.log(e);
      Promise.reject();
    });
  }

    getStatus(id){
    let query = "select status from list where id = ?";
    return this.db.executeSql(query,[id]).then(items=>{
      let list_items;
      list_items =items.rows.item(0);
      return Promise.resolve(list_items);
    }).catch(e=>{
      console.log(e);
      Promise.reject();
    });
  }


  deleteItemList(idItem){
    let  query ="delete from list_items where id = ?";
    return this.db.executeSql(query,[idItem]);
  }
}
