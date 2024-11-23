import { Component, OnInit } from '@angular/core';
import { HttpDataService } from '../../../../../services/http-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 oportunidades: any[] = [];          
  filteredOportunidades: any[] = [];  
  ubicaciones: string[] = [];         
  tiposOportunidad: string[] = [];    
  sectores: string[] = [];    

  // Valores seleccionados para los filtros
  searchTerm: string = '';
  selectedUbicacion: string = '';
  selectedTipo: string = '';
  selectedSector: string = '';
  constructor(private dataService: HttpDataService) {}


  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.dataService.getOportunidades().subscribe({
      next: (data) => {
        this.oportunidades = data;
        this.filteredOportunidades = data;

  
        this.ubicaciones = Array.from(
          new Set(
            data
              .map((o: any) => o.institucion?.ubicacion || 'Ubicación no disponible') // Asignar valor predeterminado si es null
          )
        );

        this.tiposOportunidad = Array.from(new Set(data.map((o: any) => o.tipo)));
        this.sectores = Array.from(
          new Set(
            data.map((o: any) => o.categoria?.nombre || 'Categoría no especificada') // Manejo de valores null o undefined
          )
        );

      },
      error: (err) => {
        console.error('Error loading ubicaciones:', err);
        console.error('Error al cargar oportunidades:', err);
      }
    });
  }
  

  applyFilters(): void {
    this.filteredOportunidades = this.oportunidades.filter((oportunidad) => {
      const ubicacion = oportunidad.institucion?.ubicacion || 'Ubicación no disponible';
      const sector = oportunidad.categoria?.nombre || 'Categoría no especificada';
      const nombre = oportunidad.nombre || '';
  
      const matchesUbicacion = !this.selectedUbicacion || ubicacion === this.selectedUbicacion;
      const matchesTipo = !this.selectedTipo || oportunidad.tipo === this.selectedTipo;
      const matchesSector = !this.selectedSector || sector === this.selectedSector;
      const matchesSearchTerm = !this.searchTerm || nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
    
      return matchesUbicacion && matchesTipo && matchesSector && matchesSearchTerm;
    });
    
  }
  
  

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedUbicacion = '';
    this.selectedTipo = '';
    this.selectedSector = '';
    this.filteredOportunidades = [...this.oportunidades];
  }
}
