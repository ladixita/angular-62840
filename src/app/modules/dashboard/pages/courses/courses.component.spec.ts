import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';

import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Courseservice } from '../../../../core/services/courses.service';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseServiceSpy: jasmine.SpyObj<Courseservice>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Courseservice', ['getCourses']);

    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: Courseservice, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    courseServiceSpy = TestBed.inject(Courseservice) as jasmine.SpyObj<Courseservice>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los cursos al inicializar', () => {
    const mockCourses = [
      { id: '1', nombreCurso: 'Matematicas', activo: true },
      { id: '2', nombreCurso: 'Historia', activo: false },
    ];

    courseServiceSpy.getCourses.and.returnValue(of(mockCourses));
    fixture.detectChanges(); // Trigger ngOnInit()

    expect(component.dataSource.length).toBe(2);
    expect(component.dataSource).toEqual(mockCourses);
    expect(courseServiceSpy.getCourses).toHaveBeenCalled();
  });
});
