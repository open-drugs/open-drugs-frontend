import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiResponse, PageOptions } from '../../core/models/api/response.model';
import { WindowWidth } from '../../core/utils/window-width';
import { WindowWidthService } from '../../core/services/browser/window-width.service';
import { MockApiService } from '../../core/services/api/mock-api.service';
import { Experiment } from '../../core/models/api/experiment.model';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent extends WindowWidth implements OnInit, OnDestroy {
  public feedData: ApiResponse<Experiment>;
  public pageOptions: PageOptions;
  public feedLayout: 'table' | 'cards';
  private unsubscribe$ = new Subject();

  constructor(
    public windowWidthService: WindowWidthService,
    private searchService: SearchService,
    private mockApiService: MockApiService,
  ) {
    super(windowWidthService);
  }

  ngOnInit(): void {
    this.getSpecies();

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

  private getSpecies(): void {
    this.mockApiService.getSpecies()
      .pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe((res) => {
        this.feedData = res;
        console.log(this.feedData);
        this.pageOptions = res.options; // TODO: пагинация
    });
  }
}
