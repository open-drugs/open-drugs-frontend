import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/response.model';
import { Drug } from '../../models/api/drug.model';

@Injectable({
  providedIn: 'root'
})
export class ExperimentApiService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getDrugs(): Observable<ApiResponse<Drug>> {
    return this.http.get<ApiResponse<Drug>>(this.url + 'api/experiment/search');
  }

  getDrugById(id: number): Observable<Drug> {
    return this.http.get<Drug>(this.url + `api/experiment/${id}`);
  }
}
