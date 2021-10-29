import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios/servicios.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';
import { AlertsService } from '../../services/extras/alerts/alerts.service';

@Component({
  selector: 'app-sillas-mesas',
  templateUrl: './sillas-mesas.component.html',
  styleUrls: ['./sillas-mesas.component.css']
})
export class SillasMesasComponent implements OnInit {

  
  inflables:any = [
    { img: './assets/imgs/salones/salon.jpg', precio: '1500', descripcion: 'Salon con grandes entradas de luz, con colores claros y estilo elegante' },
    { img: './assets/imgs/salones/salon1.jpg', precio: '1900',  descripcion: 'Salon con estilo antigüo, buena iluminacion, colores claros y elegante.' },
    { img: './assets/imgs/salones/salon2.jpg', precio: '1435',  descripcion: 'Salon de fiestas estilo disco, con luces led, amplia pista de baile.' },
    { img: './assets/imgs/salones/salon3.jpg', precio: '1235',  descripcion: 'Salon contemporaneo con buena iluminacion' },
  ]
  constructor(
    private serviciosService: ServiciosService,
     public sanitizer: DomSanitizer,
     private alertService: AlertsService,
    private carritoService: CarritoServiciosService
  ) { }

  ngOnInit(): void {
  }

}
