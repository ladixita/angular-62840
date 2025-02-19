import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courseservice } from '../../../../../../core/services/courses.service';
import { Curso } from '../../../../../../interfaces/Curso.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit{
  isLoading = false;
  course: Curso | null = null;

  errorMessage = '';
  courseId: string;
  courseName: string;

  constructor(private coursesService: Courseservice, private activatedRoute: ActivatedRoute) {
      this.courseId = this.activatedRoute.snapshot.params['id'];
      const courseN = this.activatedRoute.snapshot.queryParams['nombreCurso'];

      this.courseName = courseN;
    }

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService
      .getCourseDetail(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (course) => {
          this.course = course;
          this.errorMessage = '';
        },
        complete: () => {
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.errorMessage = 'El curso no existe';
            }
          }
        },
      });
  }
}
