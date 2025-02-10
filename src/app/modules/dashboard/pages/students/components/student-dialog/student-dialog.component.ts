import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../../../../../interfaces/Alumno.Interface';
import { generateRandomId } from '../../../../../../shared/utils';

@Component({
  selector: 'app-student-dialog',
  standalone: false,

  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  alumnoForm: FormGroup;

  constructor(private fb: FormBuilder, private matDialogRef: MatDialogRef<StudentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data?: { editingStudent: Alumno }) {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      estaAprobado: [true, [Validators.required]]
    });

    if(this.data?.editingStudent) {
      console.log('edit student', this.data.editingStudent);
      this.alumnoForm.patchValue(this.data.editingStudent);
    }
  }

  onSave(): void {
    console.log(this.alumnoForm.value);
    if(this.alumnoForm.valid) {
      this.matDialogRef.close(this.alumnoForm.value)
      // this.matDialogRef.close({
      //   // ...this.alumnoForm.value,
      //   // codigo: this.editingAlumno != null ? this.editingAlumno.codigo : generateRandomId(6),

      // });
    } else {
      this.alumnoForm.markAllAsTouched();
      alert('Formulario invalido');
    }
  }
}
