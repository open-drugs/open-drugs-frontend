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
    let o = null;
    this.route.queryParams.subscribe(params => {
      if (param) {
        o = params[param];
      } else {
        o = params;
      }
    });
    return of(o);
  }

  public getFiltersState(): Observable<FilterParamsModel> {
    return of({...this.appliedFiltersState});
  }

  private removeEmptyFields(obj: {}) {
    return Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
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

    const filterParams = this.removeEmptyFields(this.appliedFiltersState);
    console.log('filterParams: ', filterParams);

    this.router.navigate(
      [urlWithoutParams],
      {
        queryParams: { ...filterParams },
      });
  }
}
