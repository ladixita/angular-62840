import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../../../../../interfaces/Alumno.Interface';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-students-table',
  standalone: false,

  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss'
})
export class StudentsTableComponent {
  @Input() dataSource: Alumno[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Alumno>();

  displayedColumns: string[] = ['codigo', 'nombre', 'apellido', 'edad', 'aprobado', 'acciones'];
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }
}
