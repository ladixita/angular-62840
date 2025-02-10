import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailComponent,
    CourseDialogComponent,
    CourseTableComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
