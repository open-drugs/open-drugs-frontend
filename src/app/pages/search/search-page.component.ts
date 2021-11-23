import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
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
  public searchQuery: string = '';
  public searchResults: Experiment[] = []; // TODO: typing
  private subscription$ = new Subject();

  constructor(
    private searchService: SearchService,
    private mockService: MockApiService,
  ) {
    this.updateSearchQuery();
  }

  private updateSearchQuery(): void {
    this.searchService.retrieveSearchQueryFromUrl();
    this.searchQuery = this.searchService.searchQuery;
  }

  public search ($query: string): void {
    this.searchService.search($query);
    this.searchQuery = $query;
    console.log('query in a field ', this.searchQuery);
    this.mockService.getMockResponse()
      .pipe(takeUntil(this.subscription$))
      .subscribe(
        (response: ApiResponse<Experiment>) => {
          this.searchResults = response?.items;
        },
        (error) => (console.error(error))
      );
  }

  public updateSearch($query: string) : void {
    this.search($query);
  }

  ngOnInit(): void {
    this.search(this.searchQuery);
  }
}
