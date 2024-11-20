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
    { id: 'servicios', label: 'Servicios', icon: 'home.png' },
    { id: 'notificaciones', label: 'Notificaciones', icon: 'bell.png' },
    { id: 'configuracion', label: 'Configuración', icon: 'settings.png' },
  ];

  setActiveSection(section: string) {
    this.activeSection = section;
    this.showSidebar = false;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
