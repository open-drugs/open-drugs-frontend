import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/response.model';
import { Experiment } from '../../models/api/experiment.model';

@Injectable({
  providedIn: 'root'
})
export class ExperimentApiService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getExperiments(params?: any): Observable<ApiResponse<Experiment>> {
    return this.http.get<ApiResponse<Experiment>>( `${this.url}api/experiment/search`, {params});
  }

  getExperimentById(id: number): Observable<Experiment> {
    return this.http.get<Experiment>( `${this.url}api/experiment/${id}`);
  }
}
