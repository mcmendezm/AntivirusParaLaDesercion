import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const BASE_URL = 'http://localhost:8080/api'; 
@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJHdWlsbGVybW8iLCJpYXQiOjE3MzE2MjM4OTYsImV4cCI6MTczMTcxMDI5Nn0.xmyir79jCnVhLv2wyFwQdI8NNEkUZ2MuHmT_IW8ye1o'}` 
    });
  }

  // Método para obtener ubicaciones de instituciones
  getUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/instituciones`, { headers: this.getHeaders() });
  }

  // Método para obtener tipos de oportunidad
  getTiposOportunidad(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/oportunidades`, { headers: this.getHeaders() });
  }

  // Método para obtener sectores
  getSectores(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/categorias`, { headers: this.getHeaders() });
  }
  getOportunidades(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/oportunidades`, { headers: this.getHeaders() });
  }
  
}

