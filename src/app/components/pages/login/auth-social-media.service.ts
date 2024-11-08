
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthSocialMediaService {
  private firebaseConfig = {
    apiKey: "AIzaSyBMLyVBxvMwV44fmjIG4reO9QZ8C0jjnbc",
    authDomain: "botones-d533a.firebaseapp.com",
    projectId: "botones-d533a",
    storageBucket: "botones-d533a.firebasestorage.app",
    messagingSenderId: "1017509360628",
    appId: "1:1017509360628:web:f213ed328d18c5ad627fa1",
    measurementId: "G-R11QV45Q2V"
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
