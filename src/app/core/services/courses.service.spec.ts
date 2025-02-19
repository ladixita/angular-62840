import { TestBed } from '@angular/core/testing';
import { Courseservice } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Curso } from '../../interfaces/Curso.interface';
import { environment } from '../../../environments/environment.development';

describe('Courseservice', () => {
  let service: Courseservice;
  let httpMock: HttpTestingController;
  const baseApiUrl = environment.baseApiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Courseservice],
    });
    service = TestBed.inject(Courseservice);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todos los cursos', () => {
    const mockCourses: Curso[] = [
      { id: '1', nombreCurso: 'Matematicas', activo: true },
      { id: '2', nombreCurso: 'Fisica', activo: false },
    ];

    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${baseApiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('debería agregar un nuevo curso', () => {
    const newCourse = { nombreCurso: 'Química', activo: true };

    service.addCourse(newCourse).subscribe((courses) => {
      expect(courses).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseApiUrl}/courses`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  });

  it('debería eliminar un curso por id', () => {
    const id = '1';

    service.deleteCourseById(id).subscribe((courses) => {
      expect(courses).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseApiUrl}/courses/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
