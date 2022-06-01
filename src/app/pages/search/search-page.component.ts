import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FilterResponseModel } from '../../core/models/filter-response.model';
import { MockApiService } from '../../core/services/api/mock-api.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  public searchQuery = '';
  public searchResults: any[] = []; // TODO: typing

  private searchListForFiltering: any[] = []; // TODO: typing
  private subscription$ = new Subject();

  constructor(
    private searchService: SearchService,
    private mockApiService: MockApiService
  ) {
    this.updateSearchQuery();
  }

  ngOnInit(): void {
    this.search(this.searchQuery);
    this.searchService.getQueries()
      .subscribe((queries) => console.log(queries));
  }

  private updateSearchQuery(): void {
    this.searchService.retrieveSearchQueryFromUrl();
    this.searchQuery = this.searchService.searchQuery;
  }

  public search($query: string): void {
    this.searchService.search($query);
    this.searchQuery = $query;
    this.mockApiService.getSpecies()
      .pipe(takeUntil(this.subscription$))
      .subscribe(
        (response) => {
          this.searchResults = response?.items;
          this.searchListForFiltering = response?.items;
        },
        (error) => (console.error(error)),
      );
  }

  public updateSearch($query: string): void {
    this.search($query);
  }

  private updateSearchFeedByFilterParams(filterParams: FilterResponseModel): void {
    const arrayOfValues = Object.values(filterParams).filter(res => res);

    if (!arrayOfValues.length) {
      this.searchResults = [...this.searchListForFiltering];
      return;
    }

    this.searchResults = this.searchListForFiltering?.filter((result) => {
      const searchedText = [
        result.year,
        result.sex,
      ];

      return arrayOfValues.every(param => searchedText.includes(param as string));
    });
  }

}
