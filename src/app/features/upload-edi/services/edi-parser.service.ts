import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EdiParserService {
  private apiUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private localStorageService: LocalStorageService
  ) {}

  uploadFile(file: File): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<{ message: string }>(`${this.apiUrl}/ediparser/upload`, formData, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.localStorageService.getToken()}`,
        }),
      })
      .pipe(catchError(this.errorHandlerService.handleError));
  }
}
