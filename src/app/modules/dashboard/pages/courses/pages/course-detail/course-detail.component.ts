import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  courseId: string;
  courseName: string;

  constructor(private activatedRoute: ActivatedRoute) {
      this.courseId = this.activatedRoute.snapshot.params['id'];
      const courseN = this.activatedRoute.snapshot.queryParams['nombreCurso'];

      this.courseName = courseN;
    }
}
