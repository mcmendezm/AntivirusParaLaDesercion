import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-services-card',
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.css']
})
export class ServicesCardComponent {
  @Input() link: string = '';
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() buttonText: string = 'LO QUIERO';
}
