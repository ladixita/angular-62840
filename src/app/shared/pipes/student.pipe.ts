import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentPipe',
  standalone: false
})
export class StudentPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Aprobado' : 'Desaprobado';
  }
}
