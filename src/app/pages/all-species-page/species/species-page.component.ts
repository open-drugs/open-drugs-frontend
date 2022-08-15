import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WindowWidth } from '../../../core/utils/window-width';
import { Experiment } from '../../../core/models/api/experiment.model';
import { PageOptions } from '../../../core/models/api/response.model';
import { WindowWidthService } from '../../../core/services/browser/window-width.service';
import { ExperimentApiService } from '../../../core/services/api/experiment-api.service';
import { PlotDataService } from '../../../core/services/api/plot-data.service';
import { Filters } from '../../../core/models/api/filters.model';
import {
  FilterQueryParams,
  FilterStateModel,
} from '../../../core/models/filter-response.model';
import { FilterParametersService } from '../../../core/services/filter-parameters.service';
import { OrganismTableService } from '../../../components/shared/organism-table/services/organism-table.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.scss'],
})
export class SpeciesPageComponent extends WindowWidth implements OnInit, OnDestroy {
  public experimentsList: Experiment[] = [];
  public filtersOptions: Filters;
  public experimentsPageOptions: PageOptions;
  public loaderVisible = true;
  public showFeed: boolean;
  public errorMessage = '';
  public feedLayout: 'table' | 'cards';
  public page = 1;
  public plotData: any[] = [];
  public plotLayout = {
    autosize: true,
    showlegend: true,
    legend: {},
    title: '',
    xaxis: {
      autorange: true,
      ticks: 'outside',
      zeroline: false,
      linewidth: 2,
    },
    yaxis: {
      autorange: true,
      ticks: 'outside',
      zeroline: false,
      linewidth: 2,
    },
  };
  public windowSizeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  public defaultCheckedIds: number[];
  private filterParams: FilterStateModel;
  private unsubscribe$ = new Subject();

  constructor(
    public windowWidthService: WindowWidthService,
    private filterParametersService: FilterParametersService,
    private experimentApiService: ExperimentApiService,
    private plotDataService: PlotDataService,
    private organismTableService: OrganismTableService,
    private localStorageService: LocalStorageService,
  ) {
    super(windowWidthService);
  }

  ngOnInit(): void {
    this.getExperimentsData();

    this.initWindowWidth(() => {
      this.feedLayout = 'table'; // this.isMobile ? 'cards' : 'table'
      this.plotLayout.legend = {
        orientation: this.isMobile ? 'h' : '',
      };
    });

    this.detectWindowWidth(() => {
      this.windowSizeChanged.emit(true);
      this.feedLayout = 'table'; // this.isMobile ? 'cards' : 'table'
      this.plotLayout.legend = {
        orientation: this.isMobile ? 'h' : '',
      };
    });
  }

  // tslint:disable-next-line:ban-types
  public retrieveAndSetParams(next?: Function): void {
    this.filterParametersService.getFiltersState()
      .pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe((res) => {
      const params = res;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          if (params[key as FilterQueryParams]?.length === 0) {
            delete params[key as FilterQueryParams];
          } else if (params[key as FilterQueryParams] === undefined) {
            delete params[key as FilterQueryParams];
          }
        }
      }

      this.filterParams = params;
    });

    if (next) {
      next.call(this);
    }
  }

  private setCheckedExperiments(ids: number[]) {
    const storageIds = this.localStorageService.getStorageValue('checkedIds');
    const idArr = storageIds?.length > 0
        ? storageIds
        : ids;
    this.organismTableService.setCheckedIds(idArr);
    this.organismTableService.getCheckedIds()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((checkedIds) => {
        this.defaultCheckedIds = checkedIds;
      });

  }

  public getExperimentsData(): void {
    this.loaderVisible = true;
    const filterParams = this.filterParams ? this.filterParams : {};
    this.experimentApiService.getExperiments(filterParams, this.page)
      .pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe((res) => {
      this.experimentsList = res.items;
      this.filtersOptions = res.filters;
      this.experimentsPageOptions = res.options;
      this.loaderVisible = false;
      if (res.items.length > 0) {
        this.showFeed = true;
        this.setCheckedExperiments([res.items[0].id, res.items[1].id, res.items[2].id]);
        this.errorMessage = '';
      } else {
        this.showFeed = false;
      }
    },
      (error) => {
        this.showFeed = false;
        this.errorMessage = error.message;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public setPlotData(experimentIds: number[]): void {
    console.log('setPlotData', experimentIds);
    this.localStorageService.setStorage('checkedIds', experimentIds);
    this.setCheckedExperiments(experimentIds);

    if (experimentIds.length) {
      this.plotDataService.getPlotDataById(experimentIds)
        .pipe()
        .subscribe((data) => {
          this.plotLayout.title = data.options?.chartsCategory;

          this.plotData = data.items.map((plot) => {
            return {
              name: plot.title,
              mode: plot.coordinates.mode,
              type: 'scatter',
              x: plot.coordinates.x.reverse(),
              y: plot.coordinates.y,
            };
          });
          this.loaderVisible = false;
        });
    } else {
      this.plotData = [];
    }
  }

  public pageEventHandler(event: PageEvent): void {
    if (this.page < event.length) {
      this.page = this.page + 1;
      this.getExperimentsData();
    }
  }
}
