import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../../../interfaces/Alumno.Interface';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { generateRandomId } from '../../../../shared/utils';
import { StudentsService } from '../../../../core/services/students.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  nombreAlumno = '';
  alumno: Alumno | null = null;
  dataSource: Alumno[] = [];
  isLoading = false;
  isAdmin$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private _studentsService: StudentsService,
    private authService: AuthService
    ) {
      this.isAdmin$ = this.authService.isAdmin$;
  }

  handleStudentsUpdate(data: Alumno[]): void {
    this.dataSource = [...data];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._studentsService.getStudents().subscribe({
      next: (data) => {
        this.handleStudentsUpdate(data);
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(editingStudent?: Alumno): void {
    this.matDialog.open(StudentDialogComponent, { data: { editingStudent }, autoFocus: true}).afterClosed().subscribe({
      next: (data) => {
        if(!!data) {
          if(!!editingStudent) {
            this.editAlumno(editingStudent.codigo, data);
          } else {
            this.addStudent(data);
          }
        }
      }
    });
  }

  editAlumno(codigo: string, data: {nombre: string, Apellido: string, edad: number,  estaAprobado: boolean }) {
    this.isLoading = true;
    //enviando alumno
    this._studentsService.updateStudentById(codigo, data).subscribe({
      next: (data) => this.handleStudentsUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  addStudent(data: {nombre: string, Apellido: string, edad: number,  estaAprobado: boolean }): void {
    this.isLoading = true;
    this._studentsService.addStudent(data).subscribe({
      next: (data) => this.handleStudentsUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  deleteAlumnoById(cod: string) {
    if(confirm('Esta seguro de eliminar un alumno?')) {
      this.isLoading = true;
      this._studentsService.deleteStudentById(cod).subscribe({
        next: (data) => {
          this.handleStudentsUpdate(data);
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  // deleteAlumnoById(cod: string | number) {
  //   if(confirm('Esta seguro de eliminar un alumno?')) {
  //     this.dataSource = this.dataSource.filter((el) => el.codigo != cod);
  //   }
  // }
}
