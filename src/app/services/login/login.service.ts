import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/environments/environment';
import { usuarios } from 'src/app/model/usuarios.interface';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  tipo: string = 'usuarios';
  url:string = `${URL_SERVICIOS}${this.tipo}/`;
  public usuario: usuarios ;
  user: any = null;
  token: string = '';
    
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.cargarStorage();
   }
  
  login(usuario: usuarios) {
    return this.http.post(`${this.url}login/`, usuario).pipe(
      map((data: any) => {
        this.guardarStorage(data.usuario.id, data.token, data.usuario);
        this.router.navigateByUrl('/home');
        return data;
       
      }),
      catchError((err) => {
        var mensaje = '';
        if (err) {
          mensaje = err;
        } else {
          mensaje = 'Ocurrio un error';
        }
        return throwError(err);
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: any,) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));
    this.usuario = usuario.nombre;
    this.token = token;
  }
  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }
  
 public  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  
 



}
