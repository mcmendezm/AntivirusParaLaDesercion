import { Component, OnInit } from '@angular/core';
import { HttpDataService } from '../../../../../services/http-data.service'; // Ajusta la ruta según tu estructura de archivos
import { AuthService } from '../../../../../services/auth.service'; // Ajusta la ruta según tu estructura de archivos

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  ubicaciones: string[] = [];
  tiposOportunidad: string[] = [];
  sectores: string[] = [];

  constructor(private dataService: HttpDataService, private authService: AuthService) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
/*     if (!this.authService.isAuthenticated()) {
      console.error('Usuario no autenticado. Redirige al login.');
      return;
    } */

    // Cargar ubicaciones desde la API
    this.dataService.getUbicaciones().subscribe({
      next: (data) => {
        console.log('Ubicaciones:', data);
        this.ubicaciones = Array.from(new Set(data.map((item: any) => item.ubicacion)));
      },
      error: (err) => {
        console.error('Error loading ubicaciones:', err);
      }
    });

    // Cargar tipos de oportunidad desde la API
    this.dataService.getTiposOportunidad().subscribe({
      next: (data) => {
        console.log('Tipos de Oportunidad:', data);
        this.tiposOportunidad = Array.from(new Set(data.map((item: any) => item.tipo)));
      },
      error: (err) => {
        console.error('Error loading tiposOportunidad:', err);
      }
    });

    // Cargar sectores desde la API
    this.dataService.getSectores().subscribe({
      next: (data) => {
        console.log('Sectores:', data);
        this.sectores = Array.from(new Set(data.map((item: any) => item.nombre)));
      },
      error: (err) => {
        console.error('Error loading sectores:', err);
      }
    });
  }
}
