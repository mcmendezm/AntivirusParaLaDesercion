import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient, private authService: AuthService) {}

  login(email: string, password: string): void {
    this.http.post<{ token: string }>('http://localhost:8080/auth/login', { email, password })
      .subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          console.log('Login successful!');
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
  }
}
