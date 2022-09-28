import {
  Component
} from '@angular/core';
import {
  ToastController
} from '@ionic/angular';
//importar el servicio creado anteriormente 
import {
  CrudService
} from '../crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombre = "";
  fono = "";
  rut = "";
  listado = [];
  constructor(private crud: CrudService, private toast: ToastController) {}

  async agregar(txtRut: HTMLInputElement, txtNombre: HTMLInputElement, txtFono: HTMLInputElement) {
    const datos = [{
      "rut": txtRut.value,
      "nombre": txtNombre.value,
      "fono": txtFono.value
    }]
    await this.crud.agregar(datos);
    txtRut.value = "";
    txtNombre.value = "";
    txtFono.value = "";

  }
  async buscar(txtRut: HTMLInputElement) {
    const valor = await this.crud.rescatar(txtRut.value)

    if (valor != null) {
      //muestra el valor encontrado
      this.rut = valor[0].rut
      this.nombre = valor[0].nombre
      this.fono = valor[0].fono
      txtRut.value = "";
    } else {
      this.nombre = "";
      this.fono = "";
      const toast = await this.toast.create({
        message: "el rut no fue especificado",
        duration: 2000,
        color: 'danger',
        position: 'middle'
      });
      toast.present();
    }
  }
  async eliminar() {
    let rutEliminar = this.rut;
    if (rutEliminar.trim().length == 0) {
      const toast = await this.toast.create({
        message: "el rut no fue encontrado",
        duration: 2000,
        color: 'danger',
        position: 'middle'
      });
      toast.present();
    } else {
      const valor = await this.crud.rescatar(rutEliminar);
      if (valor == null) {
        const toast = await this.toast.create({
          message: "el rut no fue encontrado",
          duration: 2000,
          color: 'danger',
          position: 'middle'
        });
        toast.present();
      } else {
        this.crud.eliminar(rutEliminar);
        const toast = await this.toast.create({
          message: "el rut fue encontrado",
          duration: 2000,
          color: 'danger',
          position: 'middle'
        });
        toast.present();
      }
    }

    this.nombre = "";
    this.fono = "";

  }

  async listar() {
    this.listado = this.crud.listar()
  }


}
