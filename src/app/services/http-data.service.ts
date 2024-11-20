import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

const BASE_URL = 'http://localhost:8080/api'; 

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener las cabeceras con el token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('Token no encontrado. Asegúrate de que el usuario esté autenticado.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Manejo de errores para todas las peticiones HTTP
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Algo salió mal. Intenta nuevamente más tarde.'));
  }

  // Método para obtener ubicaciones de instituciones
  getUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/instituciones`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obtener tipos de oportunidad
  getTiposOportunidad(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/oportunidades`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obtener sectores
  getSectores(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/categorias`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obtener todas las oportunidades
  getOportunidades(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/oportunidades`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obtener todas los usuarios que estan en la base de datos
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/usuarios`, { headers: this.getHeaders() });
  }
}
