import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css']
})
export class InstitutionsComponent implements OnInit {
  instituciones: any[] = [];
  nuevaInstitucion: any | null = null;

  constructor(private dataService: HttpDataService) {}

  ngOnInit(): void {
    this.loadInstituciones();
  }

  private loadInstituciones(): void {
    this.dataService.getInstituciones().subscribe({
      next: (data: any[]) => {
        this.instituciones = data.map((institucion) => ({
          ...institucion,
          isEditing: false, 
        }));
      },
      error: (err: any) => {
        console.error('Error al cargar instituciones:', err);
      },
    });
  }

  eliminarInstitucion(id: number): void {
    this.dataService.deleteInstitucion(id).subscribe({
      next: () => {
        this.instituciones = this.instituciones.filter((institucion) => institucion.id !== id);
      },
      error: (err: any) => {
        console.error(`Error al eliminar la institución con ID ${id}:`, err);
      },
    });
  }

  enableEditMode(institucion: any): void {
    this.instituciones.forEach(i => i.isEditing = false);
    institucion.isEditing = true;
  }

  guardarEdicion(institucion: any): void {
    this.dataService.updateInstitucion(institucion.id, institucion).subscribe({
      next: (institucionActualizada) => {
        const index = this.instituciones.findIndex((i) => i.id === institucion.id);
        if (index !== -1) {
          this.instituciones[index] = { ...institucionActualizada, isEditing: false };
        }
      },
      error: (err) => {
        console.error('Error al actualizar la institución:', err);
      }
    });
  }

  cancelarEdicion(institucion: any): void {
    institucion.isEditing = false;
    this.loadInstituciones();
  }

  abrirFormularioNuevaInstitucion(): void {
    this.nuevaInstitucion = {
      nombre: '',
      direccion: '',
      telefono: '',
    };
  }

  guardarNuevaInstitucion(): void {
    const payload = {
      nombre: this.nuevaInstitucion.nombre,
      direccion: this.nuevaInstitucion.direccion,
      telefono: this.nuevaInstitucion.telefono,
    };

    this.dataService.crearInstitucion(payload).subscribe({
      next: (institucionCreada) => {
        this.instituciones.push({ ...institucionCreada, isEditing: false });
        this.nuevaInstitucion = null; 
      },
      error: (err) => {
        console.error('Error al crear la institución:', err);
      },
    });
  }

  cancelarCreacion(): void {
    this.nuevaInstitucion = null;
  }
}
