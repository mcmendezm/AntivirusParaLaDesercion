import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-card',
  templateUrl: './opportunity-card.component.html',
  styleUrls: ['./opportunity-card.component.css']
})
export class OpportunityCardComponent {
  @Input() imageSrc!: string;
  @Input() imageAlt!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() modalidad!: string; 
  @Input() requisitos!: string; 
  @Input() tipo!: string; 
  @Input() institucion!: string; 
  @Input() ubicacion!: string;
}
