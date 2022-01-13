import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlotData, PlotOptions } from '../models/plot';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class PlotDataService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {
  }

  public getPlotDataById(ids: number[]): Observable<PlotData<PlotOptions>> {
    const strIds = ids.join(',');

    const params = new HttpParams()
      .set('lang', this.translate.currentLang)
      .set('ids', strIds);

    return this.http.get<PlotData<PlotOptions>>(this.url + `api/experiment/plot`, {params});
  }
}
