import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class CarritoProductoService {
  listaproductos: any [] = [];
  carrito: any [] = [];
  myString: any;

  constructor(
       private storageService: StorageService,
  ) { }

setCarproductos(obj, id?:any){
     this.listaproductos.push(obj); 
     console.log(obj);
     this.storageService.setCart(this.listaproductos); 
//  this.listaproductos = [];    
  //  this.storageService.setCart(this.listacarrito);
}
getcarproductos(){
      this.carrito = this.storageService.getCart();
      return this.carrito;
}
  
listacarr(){
  this.carrito = this.listaproductos;
   return  this.carrito;
}


delectproductos(item:number){
    console.log('antes de eliminar',this.listaproductos);
    const lista =  this.storageService.getCart();
    this.listaproductos = lista;
    this.listaproductos.splice(item, 1);
    console.log('Nuevo elemento de carrito',this.listaproductos);
    this.storageService.setCart(this.listaproductos);
    return  this.listaproductos;
      
}


deletCarproduct (){
    this.listaproductos = [];
    localStorage.removeItem('cartproductos');
    return this.listaproductos;
}


menosproducto(id){
  console.log('Entra en productos');
  this.storageService.setCart(this.listaproductos);
  for (let item of this.listaproductos){
    if(item.id == id){
        if(item.cuantos != 1){
          item.cuantos--;
        }
    }
}
this.storageService.setCart(this.listaproductos);
console.log(this.listaproductos);
return this.listaproductos;
 }





 masproducto(id , cantidad){
    const obj = this.storageService.getCart();
  console.log( 'id_productos=', id, 'cantidad=',cantidad);
  console.log('Entra en mas productos');
      for (let item of obj ){
             if(item.id == id){
                  if(item.cuanty  < item.cantidad){
                     item.cuanty = cantidad ;
                  }else{
                     console.log('Ha llegado al limite de productos');
                  }
                  
             }
      }
    this.storageService.setCart(obj);
    const lista  = this.storageService.getCart();  
    console.log(lista);
    return this.listaproductos;

 }
 






}
