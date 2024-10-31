import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from './services/dark-mode.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: `
    <app-wompi-button></app-wompi-button>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-anti';

  constructor(private router: Router) {}

  navigateToSection(section: string) {
    this.router.navigate([], { fragment: section });
  }

  darkModeService: DarkModeService = inject(DarkModeService);
}
