import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  activeSection: string = 'usuarios'; 
  showSidebar: boolean = false;

  menuItems = [
    { id: 'usuarios', label: 'Usuarios', icon: 'user.png' },
    { id: 'servicios', label: 'Servicios', icon: 'home.png' },
    { id: 'notificaciones', label: 'Notificaciones', icon: 'bell.png' },
    { id: 'configuracion', label: 'Configuración', icon: 'settings.png' },
  ];

  usuarios: any[] = [];

  constructor(private dataService: HttpDataService) {}

  ngOnInit(): void {
    this.loadUsuarios(); // Cargar usuarios al iniciar el componente
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.showSidebar = false;

    if (section === 'usuarios') {
      this.loadUsuarios(); // Cargar usuarios cuando se selecciona la sección
    }
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  private loadUsuarios(): void {
    if (this.activeSection === 'usuarios') {
      this.dataService.getUsuarios().subscribe({
        next: (data) => {
          console.log('Usuarios cargados desde el backend:', data);
          this.usuarios = data;
        },
        error: (err) => {
          console.error('Error al cargar usuarios:', err);
        },
      });
    }
  }
}
