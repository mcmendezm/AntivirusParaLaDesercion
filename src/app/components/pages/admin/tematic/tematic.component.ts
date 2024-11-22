import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-tematic',
  templateUrl: './tematic.component.html',
  styleUrls: ['./tematic.component.css']
})
export class TematicComponent implements OnInit {
  categorias: any[] = [];
  nuevaCategoria: any | null = null;

  constructor(private dataService: HttpDataService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.dataService.getCategorias().subscribe({
      next: (data: any[]) => {
        this.categorias = data.map((categoria) => ({
          ...categoria,
          isEditing: false, // Control de edición
        }));
      },
      error: (err: any) => {
        console.error('Error al cargar categorías:', err);
      },
    });
  }

  abrirFormularioNuevaCategoria(): void {
    this.nuevaCategoria = {
      nombre: ''
    };
  }
  guardarNuevaCategoria(): void {
    if (!this.nuevaCategoria.nombre) return;

    this.dataService.crearCategoria(this.nuevaCategoria).subscribe({
      next: (categoriaCreada) => {
        this.categorias.push({ ...categoriaCreada, isEditing: false });
        this.nuevaCategoria = null; // Reinicia el formulario
      },
      error: (err) => {
        console.error('Error al crear la categoría:', err);
      },
    });
  }

  cancelarCreacion(): void {
    this.nuevaCategoria = null;
  }

  enableEditMode(categoria: any): void {
    this.categorias.forEach((cat) => (cat.isEditing = false)); // Desactiva edición en otros
    categoria.isEditing = true;
  }

  guardarEdicion(categoria: any): void {
    this.dataService.updateCategoria(categoria.id, { nombre: categoria.nombre }).subscribe({
      next: (categoriaActualizada) => {
        const index = this.categorias.findIndex((cat) => cat.id === categoria.id);
        if (index !== -1) {
          this.categorias[index] = { ...categoriaActualizada, isEditing: false };
        }
      },
      error: (err) => {
        console.error('Error al actualizar la categoría:', err);
      },
    });
  }

  cancelarEdicion(categoria: any): void {
    categoria.isEditing = false;
    this.loadCategorias(); // Recarga para revertir cambios no guardados
  }

  eliminarCategoria(id: number): void {
    this.dataService.deleteCategoria(id).subscribe({
      next: () => {
        this.categorias = this.categorias.filter((cat) => cat.id !== id);
      },
      error: (err) => {
        console.error('Error al eliminar la categoría:', err);
      },
    });
  }
}
