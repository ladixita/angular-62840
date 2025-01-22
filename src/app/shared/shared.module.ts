import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPipe } from './pipes/student.pipe';
import { EstadoAlumnoDirective } from './directives/estado-alumno.directive';
import { EstadoIconoDirective } from './directives/estado-icono.directive';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleStyleDirective } from './directives/title-style.directive';



@NgModule({
  declarations: [
    StudentPipe,
    EstadoAlumnoDirective,
    EstadoIconoDirective,
    FullNamePipe,
    TitleStyleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StudentPipe,
    FullNamePipe,
    EstadoAlumnoDirective,
    EstadoIconoDirective,
    TitleStyleDirective
  ]
})
export class SharedModule { }
