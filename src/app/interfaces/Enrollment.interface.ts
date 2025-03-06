import { Alumno } from "./Alumno.Interface";
import { Curso } from "./Curso.interface";

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  course?: Curso;
  student?: Alumno;
}
