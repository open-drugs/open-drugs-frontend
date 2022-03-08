import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FilterParametersService {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public retrieveQueryParamFromUrl(param: string): Observable<any> {
    this.route.queryParams.subscribe(params => {
      if (param) {
        return of(params[param])
      }

      return of(params)
    });

    return of(null);
  }

  public applyQueryParams(query: string, value: any | any[]): void {
    const val = Array.isArray(value)? value : value.split(',');
    console.log(val);
    this.router.navigate(
      [this.router.url],
      {
        queryParams: { [query]: val },
      });
  }
}
