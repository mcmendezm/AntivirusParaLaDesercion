import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = {
        'username': this.username,
        'password': this.password,
      };
    //TODO: cretae jwt token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:8080/auth/login', body, { headers, responseType: 'json' })
    .subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem('jwtToken', response.token);  // Guarda el token en el local storage
          this.router.navigate(['/news']);  // Redirige a la página de noticias
        }
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema con la solicitud. Inténtalo de nuevo más tarde.');
      }
    });
  
  }
}
