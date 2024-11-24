import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false;
    }

    // Verificar si el usuario es admin
    const isAdmin = await this.authService.validateAdminRole();
    console.log('El usuario es admin:', isAdmin);
    if (!isAdmin) {
      this.router.navigate(['/unauthorized']); // Redirigir si no es admin
      return false;
    }

    return true; // Permitir acceso si tiene el token y es admin
  }
}