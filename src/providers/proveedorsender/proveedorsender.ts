import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { retry, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorProviderSender {

  // link:string = "http://localhost/trabajos/viste_moda/app";
  link:string = "https://vistemoda.mx/app";

  constructor(private http: HttpClient) {

  }

  registroUsuario(data) {
    console.log("PROVEEDOR SENDER REGISTER USER");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/register-user.php', data, options);
  }

  registroUsuarioRedes(data) {
    console.log("PROVEEDOR SENDER REGISTER USER REDES");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/register-user-redes.php', data, options);
  }

  loginUsuario(data) {
    console.log("PROVEEDOR SENDER LOGIN");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/login-user.php', data, options);
  }

  loginUsuarioRedes(data) {
    console.log("PROVEEDOR SENDER LOGIN REDES");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/login-user-redes.php', data, options);
  }

  usuarioSuscribirNewsletter(data) {
    console.log("PROVEEDOR SENDER NEWSPAPER");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/suscribir-newspaper.php', data, options);
  }

  messageCompanyUsuario(data) {
    console.log("PROVEEDOR SENDER MESSAJE TO COMPANY");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/message-user.php', data, options);
  }

  addFavUsuario(data) {
    console.log("PROVEEDOR SENDER ADD FAV");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/usuario-fav.php', data, options);
  }

  deleteFavUsuario(data) {
    console.log("PROVEEDOR SENDER DELETE FAV");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/usuario-fav-delete.php', data, options);
  }

  view(data) {
    console.log("PROVEEDOR SENDER VIEW");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/view_page.php', data, options);
  }

  createPedido(data) {
    console.log("PROVEEDOR SENDER CREATE PEDIDO");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/create_pedido.php', data, options);
  }

  registroVistaTienda(data){
    console.log("PROVEEDOR SENDER REGISTRO TIENDA");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/usuario-vista-tienda.php', data, options);
  }

  registroVistaTiendaContacto(data){
    console.log("PROVEEDOR SENDER REGISTRO TIENDA");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/vista-tienda-contacto.php', data, options);
  }

  registroVistaProducto(data){
    console.log("PROVEEDOR SENDER REGISTRO PRODUCTO");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/usuario-vista-producto.php', data, options);
  }

  registroVistaProductoContacto(data){
    console.log("PROVEEDOR SENDER REGISTRO PRODUCTO CONTACTO");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/usuario-vista-producto-contacto.php', data, options);
  }

  registroVistaArticulo(data){
    console.log("PROVEEDOR SENDER REGISTRO ARTICULO");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/vista-articulo.php', data, options);
  }

  recoverPasswordUsuario(data){
    console.log("PROVEEDOR SENDER REGISTRO ARTICULO");
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/recuperar-contrasena.php', data, options);
  }

  registroWhatsappContact(data){
    console.log("PROVEEDOR SENDER REGISTRO");
    console.log(JSON.stringify(data));
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.link + '/vista-contacto-whatsapp.php', data, options);
  }

}