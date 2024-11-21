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
    this.loadUsuarios();
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.showSidebar = false;

    if (section === 'usuarios') {
      this.loadUsuarios(); 
    }
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  private loadUsuarios(): void {
    if (this.activeSection === 'usuarios') {
      this.dataService.getUsuarios().subscribe({
        next: (data: any[]) => {
          this.usuarios = data.map((usuario) => ({
            ...usuario,
            isEditing: false, // Agregamos el flag de edición
          }));
        },
        error: (err: any) => {
          console.error('Error al cargar usuarios:', err);
        },
      });
    }
  }

  eliminarUsuario(id: number): void {
    this.dataService.deleteUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
      },
      error: (err: any) => {
        console.error(`Error al eliminar el usuario con ID ${id}:`, err);
      },
    });
  }

  enableEditMode(usuario: any): void {
    this.usuarios.forEach(u => u.isEditing = false); // Desactiva edición en otros usuarios
    usuario.isEditing = true; // Activa edición en el usuario seleccionado
  }

guardarEdicion(usuario: any): void {
  const payload = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    password: usuario.password || '', 
    rol: usuario.rol,
    username: usuario.username || usuario.nombre, 
    fechaNacimiento: usuario.fechaNacimiento || null,
  };

  this.dataService.updateUsuario(usuario.id, payload).subscribe({
    next: (usuarioActualizado) => {
      console.log('Usuario actualizado:', usuarioActualizado);
      const index = this.usuarios.findIndex((u) => u.id === usuario.id);
      if (index !== -1) {
        this.usuarios[index] = { ...usuarioActualizado, isEditing: false };
      }
    },
    error: (err) => {
      console.error('Error al actualizar el usuario:', err);
    }
  });
}
 

  cancelarEdicion(usuario: any): void {
    usuario.isEditing = false; 
    this.loadUsuarios(); 
  }
  nuevoUsuario: any | null = null;
abrirFormularioNuevoUsuario(): void {
  this.nuevoUsuario = {
    nombre: '',
    correo: '',
    password: '',
    rol: 'USER',
    username: '',
    fechaNacimiento: '',
    authorities: [{ authority: 'USER' }],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    enabled: true
  };
}

guardarNuevoUsuario(): void {
  this.dataService.crearUsuario(this.nuevoUsuario).subscribe({
    next: (usuarioCreado) => {
      console.log('Usuario creado:', usuarioCreado);
      this.usuarios.push({ ...usuarioCreado, isEditing: false, isNew: false });
      this.nuevoUsuario = null; 
    },
    error: (err) => {
      console.error('Error al crear el usuario:', err);
    }
  });
}





cancelarCreacion(): void {
  this.nuevoUsuario = null; 
}

}
