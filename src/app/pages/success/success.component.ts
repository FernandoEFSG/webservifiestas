import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoProductoService } from '../../services/carrito-producto/carrito-producto.service';
import { CarritoServiciosService } from '../../services/carrito-servcios/carrito-servicios.service';



@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  listaproducto: any [] = [];

  constructor(
    private router: Router,
    private carritoProductoService: CarritoProductoService,
    private carritoServiciosService: CarritoServiciosService
  ) { }

  ngOnInit(): void {
      this.getcarProducto();
  }
  
  getcarProducto(){
   let estado = this.existsCartService();
   console.log(estado);
    
   if(estado == true){
       
       this.carritoProductoService.deletCarproduct();
         localStorage.removeItem('idventa');
   }else{
       this.carritoServiciosService.clearService();
       localStorage.removeItem('idrenta');
   }
    
  }

  salir(){
    this.router.navigate(['/home']);
  }
  
   existsCartService(): boolean {
      return localStorage.getItem('idventa') != null;
    }
  


}
