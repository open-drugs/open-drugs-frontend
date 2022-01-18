import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Experiment } from '../../core/models/api/experiment.model';
import { FilterService } from '../../core/services/filter.service';
import { FilterParams } from '../../core/models/filter-params';
import { ExperimentApiService } from '../../core/services/api/experiment-api.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  public searchQuery: string = '';
  public searchResults: Experiment[] = []; // TODO: typing

  private drugListForFiltering: Experiment[] = [];
  private subscription$ = new Subject();

  constructor(
    private searchService: SearchService,
    private filterService: FilterService,
    private experimentApiService: ExperimentApiService
  ) {
    this.updateSearchQuery();
  }

  ngOnInit(): void {
    this.filterService.filterForm.valueChanges
      .pipe(takeUntil(this.subscription$))
      .subscribe((filterParams: FilterParams) => {
        this.updateDrugListByFilterParams(filterParams);
      });

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
    console.log('query in a field ', this.searchQuery);
    this.experimentApiService.getDrugs()
      .pipe(takeUntil(this.subscription$))
      .subscribe(
        (response) => {
          this.searchResults = response?.items;
          this.drugListForFiltering = response?.items;
        },
        (error) => (console.error(error)),
      );
  }

  public updateSearch($query: string): void {
    this.search($query);
  }

  private updateDrugListByFilterParams(filterParams: FilterParams): void {
    const arrayOfValues = Object.values(filterParams).filter(res => res);

    if (!arrayOfValues.length) {
      this.searchResults = [...this.drugListForFiltering];
      return;
    }

    this.searchResults = this.drugListForFiltering?.filter((drug) => {
      const searchedText = [
        drug.year,
        drug.sex,
      ];

      return arrayOfValues.every(param => searchedText.includes(param as string));
    });
  }

}
