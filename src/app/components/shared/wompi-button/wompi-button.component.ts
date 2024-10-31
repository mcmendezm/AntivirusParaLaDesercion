import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wompi-button',
  templateUrl: './wompi-button.component.html',
  styleUrls: ['./wompi-button.component.css']
})
export class WompiButtonComponent {
  
  constructor(private router: Router) {}

  goToUrl(): void {
    const url = 'https://checkout.wompi.co/l/FRfRVa';
    window.open(url, '_blank');
  }

}