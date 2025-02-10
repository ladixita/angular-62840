import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from '../../../../../../interfaces/Curso.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-course-table',
  standalone: false,

  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss',
})
export class CourseTableComponent {
  @Input() dataSource: Curso[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Curso>();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'activo',
    'acciones',
  ];
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }
}
