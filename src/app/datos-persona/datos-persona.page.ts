import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApirestService } from '../apirest.service';//permite capturar el id


@Component({
  selector: 'app-datos-persona',
  templateUrl: './datos-persona.page.html',
  styleUrls: ['./datos-persona.page.scss'],
})
export class DatosPersonaPage implements OnInit {

  datos : any;
  constructor(private api:ApirestService, private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.leer();
  }
  async leer(){
    let id = "";
    this.activeRoute.paramMap.subscribe(async parametro =>{
      id = parametro.get("id");
    })
    await this.api.getUser(id);
    this.datos = this.api.item
    console.log(this.datos);
  }

}
