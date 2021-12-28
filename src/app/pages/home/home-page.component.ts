import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { ExperimentApiService } from '../../core/services/api/experiment-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageOptions } from '../../core/models/api/response.model';
import { Experiment } from '../../core/models/api/experiment.model';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public drugsData: Experiment[] = [];
  public drugsPageOptions: PageOptions;

  private unsubscribe$ = new Subject();

  constructor(
    private searchService: SearchService,
    private experimentApiService: ExperimentApiService,
  ) {
  }

  ngOnInit(): void {
    this.getDrugs();
  }

  public goToSearch($query: string): void {
    this.searchService.search($query);
  }

  private getDrugs(): void {
    this.experimentApiService.getDrugs()
      .pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe((res) => {
        this.drugsData = res.items;
        this.drugsPageOptions = res.options;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
