import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Alumno } from "../../interfaces/Alumno.Interface";
import { generateRandomId } from "../../shared/utils";

let STUDENTS: Alumno[] = [
  {
    codigo: generateRandomId(6),
    nombre: 'Leidy',
    Apellido: 'Uribe Marcos',
    edad: 32,
    estaAprobado: false
  },
  {
    codigo: generateRandomId(6),
    nombre: 'Leonardo',
    Apellido: 'Tenorio Marcos',
    edad: 28,
    estaAprobado: true
  }
];

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
  getStudents(): Observable<Alumno[]> {
    return of([...STUDENTS]).pipe(delay(300));
  }

  updateStudentById(codigo: string, data: {nombre: string, Apellido: string, edad: number,  estaAprobado: boolean }): Observable<Alumno[]> {
    STUDENTS = STUDENTS.map((student) =>
      student.codigo === codigo ? { ...student, ...data } : student
    );
    return this.getStudents();
  }

  deleteStudentById(codigo: string): Observable<Alumno[]> {
    STUDENTS = STUDENTS.filter((student) => student.codigo != codigo);
    return this.getStudents();
  }

  addStudent(payload: { nombre: string, Apellido: string, edad: number,  estaAprobado: boolean}): Observable<Alumno[]> {
    STUDENTS.push({
      ...payload,
      codigo: generateRandomId(6),
    });
    return this.getStudents();
  }
}
