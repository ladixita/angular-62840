import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPipe } from './pipes/student.pipe';
import { EstadoAlumnoDirective } from './directives/estado-alumno.directive';
import { EstadoIconoDirective } from './directives/estado-icono.directive';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleStyleDirective } from './directives/title-style.directive';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

const materialModules = [
  MatListModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatCardModule
];

@NgModule({
  declarations: [
    StudentPipe,
    EstadoAlumnoDirective,
    EstadoIconoDirective,
    FullNamePipe,
    TitleStyleDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    StudentPipe,
    FullNamePipe,
    EstadoAlumnoDirective,
    EstadoIconoDirective,
    TitleStyleDirective,
    ...[materialModules]
  ]
})
export class SharedModule { }
