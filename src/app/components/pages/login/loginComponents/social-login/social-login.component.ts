import { Component } from '@angular/core';
import { AuthSocialMediaService } from '../../auth-social-media.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent {
  constructor(
    private authSocialMediaService: AuthSocialMediaService
){}
signInWithGoogle() {
  this.authSocialMediaService
    .signInWithGoogle()
    .then((result) => {
      console.log('User signed in:', result.user);
    })
    .catch((error) => {
      console.error('Error signing in with Google:', error);
      });
  }
loginWithFacebook() {
  this.authSocialMediaService.signInWithFacebook()
    .then((result) => {
      console.log('Logged in with Facebook:', result);
    })
    .catch((error) => {
      console.error('Error logging in with Facebook:', error);
      });
  }
}
