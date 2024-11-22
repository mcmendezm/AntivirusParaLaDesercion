import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  activeSection: string = 'usuarios'; 
  showSidebar: boolean = false;

  menuItems = [
    { id: 'usuarios', label: 'Usuarios', icon: 'user.png' },
    { id: 'instituciones', label: 'Instituciones', icon: 'home.png' },
    { id: 'bootcamps', label: 'Bootcamps', icon: 'bootcams.png' },
    { id: 'oportunidades', label: 'Oportunidades', icon: 'opportunity.png' },
    { id: 'tematicas', label: 'Tematicas', icon: 'tematic.png' },
    { id: 'configuracion', label: 'Configuración', icon: 'settings.png' },
  ];

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.showSidebar = false;
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
