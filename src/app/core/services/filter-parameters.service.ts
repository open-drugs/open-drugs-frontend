import { Injectable } from '@angular/core';
import { ActivatedRoute, QueryParamsHandling, Router } from '@angular/router';
import {Observable, of } from 'rxjs';
import { FilterQueryParams, FilterResponseModel, FilterStateModel } from '../models/filter-response.model';

@Injectable({
  providedIn: 'root',
})

export class FilterParametersService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  private appliedFiltersState: any = {
    byMinLifespan: [],
    byMedLifespan: [],
    byAvgLifespan: [],
    byMaxLifespan: [],
    byIntervention: [],
    byInterventionType: '',
    byMinLifespanChangePercent: [],
    byMedLifespanChangePercent: [],
    byAvgLifespanChangePercent: [],
    byMaxLifespanChangePercent: [],
    bySpecies: '',
    byStrain: [],
    byYear: []
  };

  public retrieveQueryParamFromUrl(param?: FilterQueryParams): Observable<any> {
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

  public getFiltersState(): Observable<FilterStateModel> {
    return of({...this.appliedFiltersState});
  }

  private removeEmptyFields(obj: {}): { [p: string]: unknown } {
    return Object.entries(obj)
      .filter(([_, v]) => Array.isArray(v) ? !!v.length : v ?? v)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }

  private encode(url: string | any): string {
    if (typeof url === 'string') {
      return url.replace('/', '%2F');
    }
    return url;
  }

  public decode(url: string | any): string {
    if (typeof url === 'string') {
      return url.replace('%2F', '/');
    }
    return url;
  }

  public applyQueryParams(param: string, value: any | any[], paramHandling: QueryParamsHandling = 'merge'): void {
    if (this.appliedFiltersState.hasOwnProperty(param)) {
      this.appliedFiltersState[param as keyof FilterResponseModel] = this.encode(value);
    }
    const urlTree = this.router.parseUrl(this.router.url);
    let urlWithoutParams = '/';
    if (Object.keys(urlTree.root.children).length !== 0) {
      urlWithoutParams = urlTree.root.children?.primary.segments.map(it => it.path).join('/');
    }

    const filterParams = this.removeEmptyFields(this.appliedFiltersState);

    this.router.navigate(
      [urlWithoutParams],
      {
        queryParams: { ...filterParams },
        queryParamsHandling: paramHandling,
      });
  }
}
