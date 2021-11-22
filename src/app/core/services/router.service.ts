import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesEnum } from '../enums/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  public searchQuery: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  public navigateToSummaryPage(): void {
    this.router.navigateByUrl(RoutesEnum.Summary);
  }

  public search(query: string): void {
    // site.com/search?q=query
    console.log('search: ', query);
    this.router.navigate([RoutesEnum.Search], { queryParams: { q: query } });
    this.searchQuery = query;
  }

  public retrieveSearchQueryFromUrl(): void {
    if (this.router.url.split('?')[0] === RoutesEnum.Search) {
      this.route.queryParams.subscribe(params => {
        this.searchQuery = params['q'];
        console.log('retrieve: ', this.searchQuery);
      });
    }
  }
}
