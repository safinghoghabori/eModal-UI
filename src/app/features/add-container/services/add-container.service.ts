import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ContainerData } from '../models/add-container.model';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddContainerService {
  private apiUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private localStorageService: LocalStorageService
  ) {}

  getContainerByContainerNo(containerNo: number): Observable<ContainerData> {
    return this.http
      .get<ContainerData>(`${this.apiUrl}/container/${containerNo}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.localStorageService.getToken()}`,
        }),
      })
      .pipe(catchError(this.errorHandlerService.handleError));
  }
}
