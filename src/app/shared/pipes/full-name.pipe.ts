import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../interfaces/Alumno.Interface';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(value?: Alumno): unknown {
    return (value != null) ? `${value?.Apellido.toUpperCase()}, ${value?.nombre}` : '';
  }
}
