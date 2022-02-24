import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../../models/api/response.model';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  constructor(private http: HttpClient) {}

  public getSpecies(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(environment.apiMocks.speciesList);
  }
}
