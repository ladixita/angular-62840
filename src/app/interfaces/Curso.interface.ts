import { Alumno } from "./Alumno.Interface";

export interface Curso {
    id: string;
    nombreCurso: string;
    activo: boolean;
    students?: Alumno[];
}
