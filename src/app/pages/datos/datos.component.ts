import { Component, OnInit } from '@angular/core';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { DireccionesService } from 'src/app/services/direcciones/direcciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private productoServiceCart: CarritoProductoService,
    private alertService: AlertsService,
    private ventasService: VentasService,
    // private stripeService: StripeService,
    private direccionesService: DireccionesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
       this.form = new  FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      telefono: new FormControl(null, [Validators.required] ), 
      correo: new FormControl(null, [Validators.required]),
      calle: new FormControl(null, [Validators.required]),
      num_int: new FormControl(null, [Validators.required]),
      colonia: new FormControl(null, [Validators.required]),
      entre_calles: new FormControl(null, [Validators.required]),
      cp: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required]),
      ciudad: new FormControl(null, [Validators.required]),
    })
    this.datos();
  }

    datos(){
    const obj = JSON.parse(localStorage.getItem("user"));
    console.log(obj);
    this.form.controls.nombre.setValue(obj.nombre);
    this.form.controls.telefono.setValue(obj.telefono);
    this.form.controls.correo.setValue(obj.correo);
}
guardardatos(){
   if(this.form.valid){
      localStorage.setItem('data_user', JSON.stringify(this.form.value));
      this.router.navigate(['metodos-envios']);
   }else{

    let mensaje = 'Faltan campo por llenar';
    let titulo = 'Atención'
    this.alertService.warnig(mensaje, titulo);
       
   }
}

}
