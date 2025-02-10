import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../../interfaces/Curso.interface';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Courseservice } from '../../../../core/services/courses.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  dataSource: Curso[] = [];
  isLoading = false;
  isAdmin$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private _courseService: Courseservice,
    private authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  handleCoursesUpdate(data: Curso[]): void {
    this.dataSource = [...data];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._courseService.getCourses().subscribe({
      next: (data) => {
        this.handleCoursesUpdate(data);
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(editingCourse?: Curso): void {
    this.matDialog
      .open(CourseDialogComponent, {
        data: { editingCourse },
        autoFocus: true,
      })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (!!data) {
            if (!!editingCourse) {
              this.editCurso(editingCourse.id, data);
            } else {
              this.addCurso(data);
            }
          }
        },
      });
  }

  editCurso(id: string, data: {id: string, nombreCurso: string, activo: boolean }) {
    this.isLoading = true;
    //enviando alumno
    this._courseService.updateCourseById(id, data).subscribe({
      next: (data) => this.handleCoursesUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  addCurso(data: {id: string, nombreCurso: string, activo: boolean}): void {
    this.isLoading = true;
    this._courseService.addCourse(data).subscribe({
      next: (data) => this.handleCoursesUpdate(data),
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  deleteCourseById(id: string) {
    if(confirm('Esta seguro de eliminar un curso?')) {
      this.isLoading = true;
      this._courseService.deleteCourseById(id).subscribe({
        next: (data) => {
          this.handleCoursesUpdate(data);
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
}
