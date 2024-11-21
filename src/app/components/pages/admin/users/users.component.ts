import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario: any | null = null;

  constructor(private dataService: HttpDataService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  // Cargar la lista de usuarios
  loadUsuarios(): void {
    this.dataService.getUsuarios().subscribe({
      next: (data: any[]) => {
        this.usuarios = data.map((usuario) => ({
          ...usuario,
          isEditing: false, // Flag para modo edición
        }));
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  // Habilitar modo edición para un usuario
  enableEditMode(usuario: any): void {
    this.usuarios.forEach((u) => (u.isEditing = false)); // Desactiva edición en otros usuarios
    usuario.isEditing = true; // Activa edición en el usuario seleccionado
  }

  // Guardar los cambios de un usuario
  guardarEdicion(usuario: any): void {
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: usuario.password || '', // Si no se modifica, se envía como vacío
      rol: usuario.rol,
      username: usuario.username || usuario.nombre, // Predeterminado al nombre si no se especifica
      fechaNacimiento: usuario.fechaNacimiento || null, // Fecha opcional
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
      },
    });
  }

  // Cancelar edición
  cancelarEdicion(usuario: any): void {
    usuario.isEditing = false; // Salimos del modo edición
    this.loadUsuarios(); // Recargamos la lista para restaurar los valores originales
  }

  // Abrir el formulario para agregar un nuevo usuario
  abrirFormularioNuevoUsuario(): void {
    this.nuevoUsuario = {
      nombre: '',
      correo: '',
      password: '',
      rol: 'USER', // Valor predeterminado
      username: '',
      fechaNacimiento: '',
    };
  }

  // Guardar un nuevo usuario
  guardarNuevoUsuario(): void {
    const payload = {
      nombre: this.nuevoUsuario.nombre,
      correo: this.nuevoUsuario.correo,
      password: this.nuevoUsuario.password,
      rol: this.nuevoUsuario.rol,
      username: this.nuevoUsuario.username || this.nuevoUsuario.nombre, // Si no hay username, usar nombre
      fechaNacimiento: this.nuevoUsuario.fechaNacimiento || null, // Fecha opcional
    };

    this.dataService.crearUsuario(payload).subscribe({
      next: (usuarioCreado) => {
        console.log('Usuario creado:', usuarioCreado);
        this.usuarios.push({ ...usuarioCreado, isEditing: false }); // Agregar a la lista
        this.nuevoUsuario = null; // Resetear el formulario
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
      },
    });
  }

  // Cancelar la creación de un nuevo usuario
  cancelarCreacion(): void {
    this.nuevoUsuario = null; // Resetear el formulario
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): void {
    this.dataService.deleteUsuario(id).subscribe({
      next: () => {
        console.log(`Usuario con ID ${id} eliminado`);
        this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id); // Eliminar de la lista
      },
      error: (err: any) => {
        console.error(`Error al eliminar el usuario con ID ${id}:`, err);
      },
    });
  }
}
