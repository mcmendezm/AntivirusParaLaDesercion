import { Injectable } from '@angular/core';
import { HttpDataService } from './http-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwtToken'; 

  constructor(private httpDataService: HttpDataService) {}


  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

    // Validar si el usuario es admin
    validateAdminRole(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.httpDataService.getUserRole().subscribe({
          next: (data) => {
            const isAdmin = data.role === 'ADMIN';
            resolve(isAdmin); // Resuelve con true si el rol es ADMIN
          },
          error: (err) => {
            console.error('Error al validar el rol del usuario:', err);
            resolve(false); // Resuelve con false en caso de error
          }
        });
      });
    }

  
}

