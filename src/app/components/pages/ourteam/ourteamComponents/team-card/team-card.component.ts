import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() imageSrc: string = '';
  @Input() altText: string = '';
  @Input() name: string = '';
  @Input() position: string = '';
}
