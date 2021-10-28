import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Auth: AngularFireAuth) { }

  fbProvider = new firebase.default.auth.FacebookAuthProvider();

  loginWithFB() {
    return this.Auth.signInWithPopup(this.fbProvider);
  }


}

