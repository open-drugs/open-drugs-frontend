import { Component } from '@angular/core';
import { RouterService } from '../../core/services/router.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  public searchQuery: string;

  constructor(
    private routerService: RouterService,
  ) {
    this.routerService.retrieveSearchQueryFromUrl();
    this.searchQuery = this.routerService.searchQuery;
  }
}
