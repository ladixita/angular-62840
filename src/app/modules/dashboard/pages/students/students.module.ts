import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';

const materialModules = [
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatSelectModule,
  SharedModule
];

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent,
    StudentDetailComponent,
    StudentsTableComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ...[materialModules]
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
