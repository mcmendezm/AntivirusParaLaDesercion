import { Component, OnInit } from '@angular/core';
import { HttpDataService } from '../../../../../services/http-data.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-opportunity-cards',
  templateUrl: './opportunity-cards.component.html',
  styleUrls: ['./opportunity-cards.component.css']
})
export class OpportunityCardsComponent implements OnInit {
  oportunidades: any[] = [];

  constructor(private dataService: HttpDataService) {}

  ngOnInit(): void {
    this.loadOportunidades();
  }

  private loadOportunidades(): void {
    this.dataService.getOportunidades().subscribe({
      next: (data: any[]) => {
        this.oportunidades = data;
      },
      error: (err: any) => {
        console.error('Error al cargar oportunidades:', err);
      }
    });
  }

  getImageName(nombreInstitucion: string): string {
    return nombreInstitucion.replace(/\s+/g, '-').toLowerCase() + '.jpg';
  }
}