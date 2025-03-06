import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Enrollment } from '../../interfaces/Enrollment.interface';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  constructor(private httpClient: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(
      `${environment.baseApiUrl}/enrollments`
    );
  }

  createEnrollment(data: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(
      `${environment.baseApiUrl}/enrollments`,
      data
    );
  }
}
