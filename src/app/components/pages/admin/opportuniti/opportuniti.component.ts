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
    this.dataService.obtenerOportunidades().subscribe((data) => {
      console.log('Oportunidades recibidas:', data);
      // Aseguramos que institución y categoría sean opcionales
      this.oportunidades = data.map((oportunidad) => ({
        ...oportunidad,
        institucion: oportunidad.institucion || null,
        categoria: oportunidad.categoria || null,
      }));
    });
  }

  cargarInstituciones(): void {
    this.dataService.getInstituciones().subscribe((data) => {
      console.log('Instituciones recibidas:', data);
      this.instituciones = data;
    });
  }

  cargarCategorias(): void {
    this.dataService.getCategorias().subscribe((data) => {
      console.log('Categorías recibidas:', data);
      this.categorias = data;
    });
  }

  abrirFormularioNuevaOportunidad(): void {
    this.nuevaOportunidad = {
      nombre: '',
      observaciones: '',
      tipo: '',
      encargado: '',
      modalidad: '',
      institucionId: null,
      categoriaId: null,
    };
  }

  guardarNuevaOportunidad(): void {
    if (!this.nuevaOportunidad.institucionId || !this.nuevaOportunidad.categoriaId) {
      console.error('Faltan datos requeridos: institución o categoría');
      return;
    }
  
    const payload = { ...this.nuevaOportunidad };
  
    this.dataService.crearNuevaOportunidad(payload).subscribe((oportunidad) => {
      // Asignar la institución y categoría asociadas después de guardar
      oportunidad.institucion = this.instituciones.find(
        (inst) => inst.id === Number(payload.institucionId)
      ) || null;
      oportunidad.categoria = this.categorias.find(
        (cat) => cat.id === Number(payload.categoriaId)
      ) || null;
  
      this.oportunidades.push(oportunidad);
      this.nuevaOportunidad = null;
      console.log('Nueva oportunidad guardada:', oportunidad);
    });
  }
  

  cancelarCreacion(): void {
    this.nuevaOportunidad = null;
  }

  eliminarOportunidad(id: number): void {
    this.dataService.eliminarOportunidadPorId(id).subscribe({
      next: () => {
        this.oportunidades = this.oportunidades.filter((o) => o.id !== id);
        console.log(`Oportunidad con id ${id} eliminada.`);
      },
      error: (error: any) => {
        console.error('Error al eliminar oportunidad:', error);
      },
    });
  }

  enableEditMode(oportunidad: any): void {
    oportunidad.isEditing = true;
    oportunidad.institucionId = oportunidad.institucion?.id || null;
    oportunidad.categoriaId = oportunidad.categoria?.id || null;
  }

  cancelarEdicion(oportunidad: any): void {
    oportunidad.isEditing = false;
  }

  guardarEdicion(oportunidad: any): void {
    if (!oportunidad.institucionId || !oportunidad.categoriaId) {
      console.error('Faltan datos requeridos: institución o categoría');
      return;
    }
  
    const payload = {
      ...oportunidad,
      institucionId: Number(oportunidad.institucionId),
      categoriaId: Number(oportunidad.categoriaId),
    };
  
    this.dataService.actualizarOportunidad(oportunidad.id, payload).subscribe({
      next: () => {
        // Actualizar las relaciones en el frontend
        oportunidad.institucion = this.instituciones.find(
          (inst) => inst.id === payload.institucionId
        ) || null;
        oportunidad.categoria = this.categorias.find(
          (cat) => cat.id === payload.categoriaId
        ) || null;
  
        oportunidad.isEditing = false;
        this.cdr.detectChanges();
        console.log(`Oportunidad con id ${oportunidad.id} actualizada.`);
      },
      error: (error: any) => {
        console.error('Error al guardar la oportunidad:', error);
      },
    });
  }
  
}
