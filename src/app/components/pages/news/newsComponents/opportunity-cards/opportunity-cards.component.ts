import { Component, OnInit, Input } from '@angular/core';
import { HttpDataService } from '../../../../../services/http-data.service'; // Ajusta la ruta si es necesario
@Component({
  selector: 'app-opportunity-cards',
  templateUrl: './opportunity-cards.component.html',
  styleUrls: ['./opportunity-cards.component.css']
})
export class OpportunityCardsComponent implements OnInit {
  oportunidades: any[] = [];
  @Input() filteredOportunidades: any[] = [];

  constructor(private dataService: HttpDataService) {}

  ngOnInit(): void {
    this.loadOportunidades();
  }

  private loadOportunidades(): void {
    this.dataService.getOportunidades().subscribe({
      next: (data) => {
        this.oportunidades = data;
        this.filteredOportunidades = [...this.oportunidades]; // Inicialmente, muestra todas las oportunidades
      },
      error: (err) => {
        console.error('Error al cargar oportunidades:', err);
      }
    });
  }

  getImageName(nombreInstitucion: string): string {
    return nombreInstitucion.replace(/\s+/g, '-').toLowerCase() + '.jpg';
  }

  filterOportunidades(filters: { ubicacion: string; tipo: string; sector: string; searchTerm: string }) {
    this.filteredOportunidades = this.oportunidades.filter((oportunidad) => {
      const matchesUbicacion = !filters.ubicacion || oportunidad.institucion.ubicacion === filters.ubicacion;
      const matchesTipo = !filters.tipo || oportunidad.tipo === filters.tipo;
      const matchesSector = !filters.sector || oportunidad.categoria.nombre === filters.sector;
      const matchesSearchTerm = !filters.searchTerm || oportunidad.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesUbicacion && matchesTipo && matchesSector && matchesSearchTerm;
    });
  }
}
