import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
//importar en el service al storage 


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private storage : Storage) {
    //crear el storage para su uso
    this.init();
   }

  //crear el storage
  async init(){
    await this.storage.create();
  }

  //ingresar datos al storage con key
  async agregarConKey(key : string, valor: string){
    await this.storage.set(key, valor);
  }

  // ingresar datos al storage con autoincrement
  async agregar(valor:any){
    let id = await this.storage.length() + 1;
    await this.storage.set(id.toString(), valor);
  }

  async rescatar(key:string){
    return await this.storage.get(key);
  }

  listar(){
    let listado = []
    this.storage.forEach((v,k)=>{listado.push(v)});
    return listado;
  }

  eliminar(key:string){
    this.storage.remove(key);
  }




}
