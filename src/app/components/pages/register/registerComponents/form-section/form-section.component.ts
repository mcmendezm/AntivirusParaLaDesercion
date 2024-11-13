import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css']
})
export class FormSectionComponent implements AfterViewInit {
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  fecha_nacimiento: Date | null = null;
  email: string = '';
  password: string = '';
  confirm_password: string = '';

  constructor(private renderer: Renderer2, private el: ElementRef, private http: HttpClient,  private router: Router) { }

  register() {
    if (this.password !== this.confirm_password) {
      alert('Las contraseñas no coinciden.'); // incluir trasnloco para traducir
      return;
    }

    const fechaNacimientoDate = this.fecha_nacimiento ? new Date(this.fecha_nacimiento) : null;



    const body = {
      'username': this.username,
      'password': this.password,
      'nombre': this.nombre,
      'apellido': this.apellido,
      'fecha_nacimiento': fechaNacimientoDate!.toISOString().split('T')[0],
      'correo': this.email,
      'rol': 'USER'
    };

    console.log('Datos del formulario:', body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:8080/auth/register', body, { headers, responseType: 'json' })
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

  ngAfterViewInit(): void {
    this.removeSplineLogo();
  }

  private removeSplineLogo(): void {
    const splineViewer = this.el.nativeElement.querySelector('spline-viewer');

    if (splineViewer) {
      const interval = setInterval(() => {
        const shadowRoot = splineViewer.shadowRoot;
        const logoElement = shadowRoot?.querySelector('#logo');

        if (logoElement) {
          this.renderer.removeChild(shadowRoot, logoElement);
          clearInterval(interval); // Detén la verificación una vez que el logo se haya eliminado
        }
      }, 500); // Verifica cada 500ms
    }
  }
}
