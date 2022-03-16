import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, of } from 'rxjs';
import { FilterParamsModel } from '../models/filter-params.model';

@Injectable({
  providedIn: 'root',
})

export class FilterParametersService {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private appliedFiltersState: FilterParamsModel = {
    avgLifespan: undefined,
    avgLifespanChangePercent: undefined,
    intervention: [],
    interventionType: undefined,
    maxLifespan: [],
    maxLifespanChangePercent: [],
    species: undefined,
    strain: [],
    year: []
  };

  public retrieveQueryParamFromUrl(param?: string): Observable<any> {
    this.route.queryParams.subscribe(params => {
      if (param) {
        return of(params[param])
      }

      return of(params)
    });

    return of(null);
  }

  public getFiltersState(): Observable<FilterParamsModel> {
    return of({...this.appliedFiltersState});
  }

  public applyQueryParams(param: string, value: any | any[]): void {
    if (this.appliedFiltersState.hasOwnProperty(param)) {
      if (Array.isArray(value)) {
        this.appliedFiltersState[param as keyof FilterParamsModel] = value.join(',');
      } else {
        this.appliedFiltersState[param as keyof FilterParamsModel] = value;
      }
    }
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');

    this.router.navigate(
      [urlWithoutParams],
      {
        queryParams: { ...this.appliedFiltersState },
      });
  }
}
