import { Injectable } from "@angular/core";
import { Curso } from "../../interfaces/Curso.interface";
import { generateRandomId } from "../../shared/utils";
import { delay, Observable, of } from "rxjs";

let COURSES: Curso[] = [
  {
    id: generateRandomId(6),
    nombreCurso: 'Matematicas',
    activo: true
  },
  {
    id: generateRandomId(6),
    nombreCurso: 'Fisica',
    activo: true
  }
];

@Injectable({
  providedIn: 'root'
})

export class Courseservice {
  getCourses(): Observable<Curso[]> {
    return of([...COURSES]).pipe(delay(300));
  }

  updateCourseById(id: string, data: {id: string, nombreCurso: string, activo: boolean }): Observable<Curso[]> {
    COURSES = COURSES.map((course) =>
      course.id === id ? { ...course, ...data } : course
    );
    return this.getCourses();
  }

  deleteCourseById(id: string): Observable<Curso[]> {
    COURSES = COURSES.filter((course) => course.id != id);
    return this.getCourses();
  }

  addCourse(payload: {id: string, nombreCurso: string, activo: boolean }): Observable<Curso[]> {
    COURSES.push({
      ...payload,
      id: generateRandomId(6),
    });
    return this.getCourses();
  }
}
