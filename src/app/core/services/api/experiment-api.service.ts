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

  getExperiments(params?: any, page?: number): Observable<ApiResponse<Experiment>> {
    if (params && page) {
      params.page = page;
    }

    // Handle ranges:
    // Angular HTTP client merges parameters but in its own way.
    // If the field holds an array, it's setting individual parameters into URL (i. e. byMaxLifespan=2,byMaxLifespan=80)
    // To get this result `byMaxLifespan=2,80`, we transform an array into a string.
    Object.keys(params).forEach((field) => {
      if (Array.isArray(params[field])) {
        params[field] = params[field].join(',');
      }
    });
    return this.http.get<ApiResponse<Experiment>>( `${this.url}api/experiment/search`, {params});
  }

  getExperimentById(id: number): Observable<Experiment> {
    return this.http.get<Experiment>( `${this.url}api/experiment/${id}`);
  }
}
