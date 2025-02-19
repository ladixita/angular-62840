import { Injectable } from "@angular/core";
import { Curso } from "../../interfaces/Curso.interface";
import { generateRandomId } from "../../shared/utils";
import { concatMap, delay, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

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

  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<Curso[]> {
    // return of([...COURSES]).pipe(delay(300));
    const myHeaders = new HttpHeaders().append(
      'Authorization',
      localStorage.getItem('access_token') || ''
    );

    // return this.httpClient.get<Curso[]>('http://localhost:3000/courses');
    return this.httpClient.get<Curso[]>(`${environment.baseApiUrl}/courses`, {
      headers: myHeaders,
    });
  }

  updateCourseById(id: string, data: {nombreCurso: string, activo: boolean }): Observable<Curso[]> {
    // COURSES = COURSES.map((course) =>
    //   course.id === id ? { ...course, ...data } : course
    // );
    // return this.getCourses();
    return this.httpClient
      .patch<Curso>(`${environment.baseApiUrl}/courses/${id}`, data)
      .pipe(concatMap(() => this.getCourses()));
  }

  deleteCourseById(id: string): Observable<Curso[]> {
    // COURSES = COURSES.filter((course) => course.id != id);
    // return this.getCourses();
    return (
      this.httpClient
        .delete<Curso>(`${environment.baseApiUrl}/courses/${id}`)
        // Paso 2: Consulta nuevamente el listado de cursos
        .pipe(concatMap(() => this.getCourses()))
    );
  }

  addCourse(payload: {nombreCurso: string, activo: boolean }): Observable<Curso[]> { //payload: {id: string, nombreCurso: string, activo: boolean }
    // COURSES.push({
    //   ...payload,
    //   id: generateRandomId(6),
    // });
    // return this.getCourses();

    return (
      this.httpClient
        .post<Curso>(`${environment.baseApiUrl}/courses`, payload)
        // Paso 2: Vuelve a consultar el listado completo de cursos
        .pipe(concatMap(() => this.getCourses()))
    );
  }

  getCourseDetail(id: string): Observable<Curso> {
    return this.httpClient.get<Curso>(
      `${environment.baseApiUrl}/courses/${id}?_embed=students`
    );
  }
}
