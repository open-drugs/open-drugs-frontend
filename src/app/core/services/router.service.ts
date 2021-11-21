import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from '../enums/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {
  }

  public navigateToSummaryPage(): void {
    this.router.navigateByUrl(RoutesEnum.Summary);
  }

  public search(query: string): void {
    // site.com/search?q=query
    this.router.navigate([RoutesEnum.Search], { queryParams: { q: query } });
  }
}
