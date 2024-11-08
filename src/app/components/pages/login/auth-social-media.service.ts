
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthSocialMediaService {
  private firebaseConfig = {
    apiKey: "AIzaSyBaYGUmkDa7v-BDY6f_r-JHpPNHwQjEV5s",
    authDomain: "angular-auth-898ed.firebaseapp.com",
    projectId: "angular-auth-898ed",
    storageBucket: "angular-auth-898ed.appspot.com",
    messagingSenderId: "1079606336153",
    appId: "1:1079606336153:web:5f34baa521f8999d21b608"
  };

  private app = initializeApp(this.firebaseConfig);
  private auth = getAuth(this.app)
  constructor() { }
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  }
}
