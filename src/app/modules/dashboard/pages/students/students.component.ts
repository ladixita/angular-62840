import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../../../interfaces/Alumno.Interface';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { generateRandomId } from '../../../../shared/utils';

const ELEMENT_DATA: Alumno[] = [
  {
    codigo: 'dbv3Da',
    nombre: 'Leidy',
    Apellido: 'Uribe Marcos',
    edad: 32,
    estaAprobado: false
  },
  {
    codigo: 'Abe3aD',
    nombre: 'Leonardo',
    Apellido: 'Tenorio Marcos',
    edad: 28,
    estaAprobado: true
  }
];

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  nombreAlumno = '';
  alumno: Alumno | null = null;
  displayedColumns: string[] = ['codigo', 'nombre', 'apellido', 'edad', 'aprobado', 'acciones'];
  dataSource = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {

  }

  openDialog() {
    this.matDialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        console.log('Recibimos el valor: ', value);
        if(value) {
          this.alumno = value;
          value[0] = generateRandomId(3);
          this.dataSource = [...this.dataSource, value];
        }
      }
    });
  }

  editAlumno(alumnoEdit: Alumno) {
    //enviando alumno
    this.matDialog.open(StudentDialogComponent, {data: alumnoEdit}).afterClosed().subscribe(({
      next: (value) => {
        if(!!value) {
          this.dataSource = this.dataSource.map((el) => el.codigo === alumnoEdit.codigo ? {...value, codigo: alumnoEdit.codigo} : el)
        }
      }
    }));
  }

  deleteAlumnoById(cod: string) {
    if(confirm('Esta seguro de eliminar un alumno?')) {
      this.dataSource = this.dataSource.filter((el) => el.codigo != cod);
    }
  }

  // deleteAlumnoById(cod: string | number) {
  //   if(confirm('Esta seguro de eliminar un alumno?')) {
  //     this.dataSource = this.dataSource.filter((el) => el.codigo != cod);
  //   }
  // }
}
