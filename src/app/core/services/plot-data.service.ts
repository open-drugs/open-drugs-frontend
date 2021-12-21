import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PlotData } from '../models/plot';

@Injectable({
  providedIn: 'root'
})
export class PlotDataService {

  constructor(
    private http: HttpClient
  ) { }

  public getPlotData(): Observable<PlotData> {
    return this.http.get<PlotData>(environment.apiMocks.plotData);
  }
}
