import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  inflables:any = [
    { img: './assets/imgs/piñatas/pinata2.jpg',nombre:'Piñata como entrenar a tu dragon', precio: '150', descripcion: 'Piñata de pelicula "Como entrenar a tu dragon"' },
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
