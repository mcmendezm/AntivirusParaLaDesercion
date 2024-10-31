import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opportunitie-card',
  templateUrl: './opportunitie-card.component.html',
  styleUrls: ['./opportunitie-card.component.css']
})
export class OpportunitieCardComponent {
  @Input() link: string = '';
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
