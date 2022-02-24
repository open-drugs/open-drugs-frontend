import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesEnum } from '../enums/routes.enum';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FilterParametersService {
  private allQueryParams: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.allQueryParams = JSON.parse(localStorage.getItem('queries') as string) || [];
  }

  public retrievequeryParamFromUrl(param: string): Observable<any> {
    this.route.queryParams.subscribe(params => {
      if (param) {
        console.log(params[param]);
        return of(params[param])
      }

      return of(params)
    });

    return of(null);
  }

  public getQueries(): Observable<string[]> {
    return this.allQueryParams ? of(this.allQueryParams) : EMPTY;
  }

  public storeQuery(query: string): void {
    if (this.allQueryParams?.includes(query)) {
      return;
    }

    this.allQueryParams.shift();

    this.allQueryParams.push(query);
    localStorage.setItem('queries', JSON.stringify(this.allQueryParams));

  }
}
