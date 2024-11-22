import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = 'http://localhost:8080/api'; 

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  constructor(private http: HttpClient) {}

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

  // Método para obtener todas los usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/usuarios`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Método para eliminar un usuario por ID
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/usuarios/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Método para actualizar un usuario
  updateUsuario(id: number, datosActualizados: any): Observable<any> {
    console.log('Enviando solicitud PUT con datos:', datosActualizados);
    return this.http.put<any>(`${BASE_URL}/usuarios/${id}`, datosActualizados, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
   

  // Método para obtener ubicaciones de instituciones
  getUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/instituciones`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Método para obtener tipos de oportunidad
  getTiposOportunidad(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/oportunidades`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Método para obtener sectores
  getSectores(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/categorias`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Método para obtener todas las oportunidades
  getOportunidades(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/oportunidades`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // crear usuario con metodo POST
  crearUsuario(datosNuevoUsuario: any): Observable<any> {
    return this.http
      .post<any>(`${BASE_URL}/usuarios/register`, datosNuevoUsuario, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }



  //INSTITUCIONES

  // Obtener todas las instituciones
getInstituciones(): Observable<any[]> {
  return this.http.get<any[]>(`${BASE_URL}/instituciones`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}

// Crear una nueva institución
crearInstitucion(datosNuevaInstitucion: any): Observable<any> {
  return this.http.post<any>(
    `${BASE_URL}/instituciones`,
    datosNuevaInstitucion,
    { headers: this.getHeaders() }
  ).pipe(catchError(this.handleError));
}

// Actualizar una institución existente
updateInstitucion(id: number, datosActualizados: any): Observable<any> {
  return this.http.put<any>(
    `${BASE_URL}/instituciones/${id}`,
    datosActualizados,
    { headers: this.getHeaders() }
  ).pipe(catchError(this.handleError));
}

// Eliminar una institución
deleteInstitucion(id: number): Observable<void> {
  return this.http.delete<void>(
    `${BASE_URL}/instituciones/${id}`,
    { headers: this.getHeaders() }
  ).pipe(catchError(this.handleError));
}

  

}
