import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  item : any;
  private urlAPI = "https://jsonplaceholder.typicode.com/";//url base de la API

  constructor(private httpClient : HttpClient) { }

  //método para traer a todos los usuarios que proveerá la API
  getUsers(){

    //definir url para solicitudes
    let url = this.urlAPI + "users";
    this.listado = []//limpiar propiedad
    return new Promise((resolve, reject) =>{
      this.httpClient.get(url).subscribe((data: [])=>{
        resolve(data);
        data.forEach(item =>{this.listado.push(item);})
      },
      error =>
      {
        console.log("Error en la comunicación con el servidor")
      })
    })

  }

  
//método para obtener solo a un usuario
async getUser(id:string){
  let url = this.urlAPI + "users/" + id ; 
  return new Promise((resolve, reject) =>{
    this.httpClient.get(url).subscribe((data: [])=>{
      resolve(data);
      this.item = data;
    },
    error =>
    {
      console.log("Error en la comunicación con el servidor")
    })
  })

}



}

