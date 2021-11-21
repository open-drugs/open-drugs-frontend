import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../core/services/router.service';
import { MockApiService } from '../../core/services/api/mock-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Experiment } from '../../core/models/api/experiment.model';
import { ApiResponse } from '../../core/models/api/response.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit{
  public searchQuery: string;
  public searchResults: Experiment[] = []; // TODO: typing
  private subscription$ = new Subject();

  constructor(
    private routerService: RouterService,
    private mockService: MockApiService,
  ) {
    this.routerService.retrieveSearchQueryFromUrl();
    this.searchQuery = this.routerService.searchQuery;
  }

  public search ($query: string): void {
    this.mockService.getMockResponse()
      .pipe(takeUntil(this.subscription$))
      .subscribe(
        (response: ApiResponse<Experiment>) => {
          this.searchResults = response?.items;
        },
        (error) => (console.error(error))
      );
  }

  ngOnInit(): void {
    this.search(this.searchQuery);
  }
}
