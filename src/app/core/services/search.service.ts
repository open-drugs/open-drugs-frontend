import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesEnum } from '../enums/routes.enum';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SearchService {
  public searchQuery: string;
  private allQueries: string[] = [];
  private maxStoredQueries = 5;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.allQueries = JSON.parse(localStorage.getItem('queries') as string) || [];
  }

  public search(query: string): void {
    this.router.navigate([RoutesEnum.Search], { queryParams: { q: query } });
    this.searchQuery = query;
    this.storeQuery(query);
  }

  public retrieveSearchQueryFromUrl(): void {
    if (this.router.url.split('?')[0] === RoutesEnum.Search) {
      this.route.queryParams.subscribe(params => {
        this.searchQuery = params['q'];
      });
    }
  }

  public getQueries(): Observable<string[]> {
    return this.allQueries ? of(this.allQueries) : EMPTY;
  }

  private storeQuery(query: string): void {
    if (this.allQueries?.includes(query)) {
      return;
    }

    if (this.allQueries?.length > this.maxStoredQueries) {
      this.allQueries.shift();
    }

    this.allQueries.push(query);
    localStorage.setItem('queries', JSON.stringify(this.allQueries));
  }
}
