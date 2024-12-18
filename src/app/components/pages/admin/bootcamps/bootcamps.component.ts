import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-bootcamps',
  templateUrl: './bootcamps.component.html',
  styleUrls: ['./bootcamps.component.css']
})
export class BootcampsComponent implements OnInit {
  bootcamps: any[] = [];
  instituciones: any[] = [];
  nuevoBootcamp: any = null;

  constructor(private dataService: HttpDataService) {}

  ngOnInit(): void {
    this.cargarBootcamps();
    this.cargarInstituciones();
  }

  cargarBootcamps(): void {
    this.dataService.getBootcamps().subscribe((data) => {
      this.bootcamps = data.map(bootcamp => ({
        ...bootcamp,
        institucion: bootcamp.institucion || { nombre: 'No asignada' }
      }));
    });
  }

  cargarInstituciones(): void {
    this.dataService.getInstituciones().subscribe((data) => {
      this.instituciones = data;
    });
  }

  abrirFormularioNuevoBootcamp(): void {
    this.nuevoBootcamp = {
      descripcion: '',
      informacion: '',
      costos: '',
      nombre: '',
      institucionId: null,
    };
  }

  guardarNuevoBootcamp(): void {
    if (!this.nuevoBootcamp.institucionId) {
      console.error('Falta asignar una institución');
      return;
    }
  
    const payload = { ...this.nuevoBootcamp };
  
    // Obtener la institución antes de enviar el bootcamp
    this.dataService.getInstitucionPorId(Number(payload.institucionId)).subscribe({
      next: (institucion) => {
        // Sobrescribir institucionId con el objeto completo
        payload.institucion = institucion;
  
        // Crear el bootcamp con la institución completa
        this.dataService.crearBootcamp(payload).subscribe({
          next: (bootcamp) => {
            // Agregar el bootcamp al arreglo
            bootcamp.institucion = institucion; // Asociar la institución completa
            this.bootcamps.push(bootcamp);
            this.nuevoBootcamp = null; // Limpia el formulario
            console.log('Bootcamp creado con éxito:', bootcamp);
          },
          error: (error) => {
            console.error('Error al guardar el bootcamp:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error al obtener la institución:', error);
      },
    });
  }
  

  eliminarBootcamp(id: number): void {
    this.dataService.eliminarBootcamp(id).subscribe(() => {
      this.bootcamps = this.bootcamps.filter(bootcamp => bootcamp.id !== id);
    });
  }

  enableEditMode(bootcamp: any): void {
    bootcamp.isEditing = true;
    bootcamp.institucionId = bootcamp.institucion?.id || null;
  }

  cancelarEdicion(bootcamp: any): void {
    bootcamp.isEditing = false;
  }

  guardarEdicion(bootcamp: any): void {
    const payload = {
      descripcion: bootcamp.descripcion,
      informacion: bootcamp.informacion,
      costos: bootcamp.costos,
      nombre: bootcamp.nombre,
      institucionId: bootcamp.institucionId,
    };
  
    this.dataService.actualizarBootcamp(bootcamp.id, payload).subscribe({
      next: () => {
        console.log(`Bootcamp con id ${bootcamp.id} actualizado correctamente.`);
        bootcamp.isEditing = false;
      },
      error: (error: any) => {
        console.error('Error al actualizar el bootcamp:', error);
      },
    });
  }
  
}
