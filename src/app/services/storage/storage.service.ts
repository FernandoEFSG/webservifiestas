import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor() { }

        //  carrito productos //

    existsCart(): boolean {
      return localStorage.getItem('cartproductos') != null;
    }
  
    setCart(cart: any[]): void {
      localStorage.setItem('cartproductos', JSON.stringify(cart));
    }
  
    getCart(): any[] {
      return JSON.parse(localStorage.getItem('cartproductos'));
    }
  
    clear(): void {
      localStorage.removeItem('cartproductos');
    } 

// SERCIVIOS

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
