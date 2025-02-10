import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../../../../../../interfaces/Curso.interface';

@Component({
  selector: 'app-course-dialog',
  standalone: false,

  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss',
})
export class CourseDialogComponent {
  cursoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { editingCourse: Curso }
  ) {
    this.cursoForm = this.fb.group({
      nombreCurso: ['', [Validators.required]],
      activo: [true, [Validators.required]],
    });

    if (this.data?.editingCourse) {
      console.log('edit curso', this.data.editingCourse);
      this.cursoForm.patchValue(this.data.editingCourse);
    }
  }

  onSave(): void {
    console.log(this.cursoForm.value);
    if (this.cursoForm.valid) {
      this.matDialogRef.close(this.cursoForm.value);
    } else {
      this.cursoForm.markAllAsTouched();
      alert('Formulario invalido');
    }
  }
}
