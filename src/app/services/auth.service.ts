import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string {
    return localStorage.getItem('authToken') || ''; // Recupera el token del almacenamiento local
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token); // Guarda el token en el almacenamiento local
  }

  clearToken(): void {
    localStorage.removeItem('authToken'); // Elimina el token si es necesario
  }
}
