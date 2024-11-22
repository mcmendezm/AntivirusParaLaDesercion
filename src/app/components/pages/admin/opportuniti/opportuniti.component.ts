import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-opportuniti',
  templateUrl: './opportuniti.component.html',
  styleUrls: ['./opportuniti.component.css']
})
export class OpportunitiComponent implements OnInit {
  oportunidades: any[] = [];
  instituciones: any[] = [];
  categorias: any[] = [];
  nuevaOportunidad: any = null;

  constructor(
    private dataService: HttpDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarOportunidades();
    this.cargarInstituciones();
    this.cargarCategorias();
  }

  cargarOportunidades(): void {
    this.dataService.obtenerOportunidades().subscribe({
      next: (data) => {
        this.oportunidades = data;
      },
      error: (error: any) => {
        console.error('Error al cargar oportunidades:', error);
      }
    });
  }

  cargarInstituciones(): void {
    this.dataService.getInstituciones().subscribe({
      next: (data) => {
        this.instituciones = data;
      },
      error: (error: any) => {
        console.error('Error al cargar instituciones:', error);
      }
    });
  }

  cargarCategorias(): void {
    this.dataService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  abrirFormularioNuevaOportunidad(): void {
    this.nuevaOportunidad = {
      nombre: '',
      observaciones: '',
      tipo: '',
      descripcion: '',
      requisitos: '',
      guia: '',
      datosAdicionales: '',
      canalesAtencion: '',
      encargado: '',
      modalidad: '',
      institucionId: null,
      categoriaId: null
    };
  }

  guardarNuevaOportunidad(): void {
    if (this.nuevaOportunidad) {
      const payload = {
        ...this.nuevaOportunidad,
        institucionId: this.nuevaOportunidad.institucionId,
        categoriaId: this.nuevaOportunidad.categoriaId
      };

      this.dataService.crearNuevaOportunidad(payload).subscribe({
        next: (oportunidad) => {
          this.oportunidades.push(oportunidad);
          this.nuevaOportunidad = null;
        },
        error: (error: any) => {
          console.error('Error al crear nueva oportunidad:', error);
        }
      });
    }
  }

  cancelarCreacion(): void {
    this.nuevaOportunidad = null;
  }

  eliminarOportunidad(id: number): void {
    this.dataService.eliminarOportunidadPorId(id).subscribe({
      next: () => {
        this.oportunidades = this.oportunidades.filter(o => o.id !== id);
      },
      error: (error: any) => {
        console.error('Error al eliminar oportunidad:', error);
      }
    });
  }

  enableEditMode(oportunidad: any): void {
    oportunidad.isEditing = true;
  }

  cancelarEdicion(oportunidad: any): void {
    oportunidad.isEditing = false;
  }

  guardarEdicion(oportunidad: any): void {
    const payload = {
      ...oportunidad,
      institucionId: oportunidad.institucion.id,
      categoriaId: oportunidad.categoria.id,
    };

    this.dataService.actualizarOportunidad(oportunidad.id, payload).subscribe({
      next: () => {
        oportunidad.institucion = this.instituciones.find(inst => inst.id === payload.institucionId) || oportunidad.institucion;
        oportunidad.categoria = this.categorias.find(cat => cat.id === payload.categoriaId) || oportunidad.categoria;

        oportunidad.isEditing = false;
        this.cdr.detectChanges();
        this.cargarOportunidades()
      },
      error: (error: any) => {
        console.error('Error al guardar la oportunidad:', error);
      }
    });
  }
}
