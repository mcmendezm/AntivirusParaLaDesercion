import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false;
    }
    return true; // Permitir acceso si hay token
  }
}
