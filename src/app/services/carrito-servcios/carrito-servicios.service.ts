import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class CarritoServiciosService {
   listacarritoproductos: any [] = [];
   carrito: any [] = [];
   myString: any;

  constructor(
    private storageService: StorageService,
  ) { }
  addcarrito(obj, id?:any){
    this.listacarritoproductos.push(obj); 
    console.log(obj);
    this.setCartService( this.listacarritoproductos);
}

listacarr(){
 this.carrito = this. listacarritoproductos;
  return  this.carrito;
}

deleteproducto(item:number){
  console.log('Antes de eliminar',  this.listacarritoproductos);
  this.listacarritoproductos = this.getCartService();
  console.log(this.listacarritoproductos);
 this.listacarritoproductos.splice(item, 1);
//  console.log(this.listacarritoproductos);
 this.setCartService(this.listacarritoproductos);
 this.carrito = this.getCartService();
 return  this.carrito;

}

vaciarcarrito (){
this. listacarritoproductos = [];
localStorage.removeItem('cartservice');
return this. listacarritoproductos;
}
masproducto(id){
console.log('Entra en mas productos');
   for (let item of this. listacarritoproductos){
          if(item.id == id){
               if(item.cuantos  < item.cantidad){
                  item.cuantos++;
               }else{
                  console.log('Ha llegado al limite de productos');
               }
               
          }
   }
  this.setCartService(this.listacarritoproductos);
  console.log(this.listacarritoproductos);
  return this. listacarritoproductos;
}

menosproducto(id){
console.log('Entra en productos');
 this.setCartService(this.listacarritoproductos);
for (let item of this.listacarritoproductos){
 if(item.id == id){
     if(item.cuantos != 1){
       item.cuantos--;
     }
 }
}
this.setCartService(this.listacarritoproductos);
console.log(this. listacarritoproductos);
return this.listacarritoproductos;
}


existsCartService(): boolean {
  return localStorage.getItem('cartservice') != null;
}

setCartService(cart: any[]): void {
  localStorage.setItem('cartservice', JSON.stringify(cart));
}

getCartService(): any[] {
  return JSON.parse(localStorage.getItem('cartservice'));
}

clearService(): void {
  localStorage.removeItem('cartservice');
} 







}
