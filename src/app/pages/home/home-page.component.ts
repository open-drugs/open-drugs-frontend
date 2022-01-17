import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { ExperimentApiService } from '../../core/services/api/experiment-api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageOptions } from '../../core/models/api/response.model';
import { Experiment } from '../../core/models/api/experiment.model';
import { WindowWidth } from '../../core/utils/window-width';
import { WindowWidthService } from '../../core/services/browser-view/window-width.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent extends WindowWidth implements OnInit, OnDestroy {
  public drugsData: Experiment[] = [];
  public drugsPageOptions: PageOptions;
  public feedLayout: 'table' | 'cards';
  private unsubscribe$ = new Subject();

  constructor(
    public windowWidthService: WindowWidthService,
    private searchService: SearchService,
    private experimentApiService: ExperimentApiService,
  ) {
    super(windowWidthService);
  }

  ngOnInit(): void {
    this.getDrugs();

    this.initWindowWidth(() => {
      this.feedLayout = this.isMobile ? 'cards' : 'table';
    });

    this.detectWindowWidth(() => {
      this.feedLayout = this.isMobile ? 'cards' : 'table';
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
}
