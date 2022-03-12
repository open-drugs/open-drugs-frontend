import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WindowWidth } from '../../../core/utils/window-width';
import { Experiment } from '../../../core/models/api/experiment.model';
import { PageOptions } from '../../../core/models/api/response.model';
import { WindowWidthService } from '../../../core/services/browser/window-width.service';
import { ExperimentApiService } from '../../../core/services/api/experiment-api.service';
import { PlotDataService } from '../../../core/services/api/plot-data.service';
import { Filters } from '../../../core/models/api/filters.model';
import { FilterParamsModel, FilterTypes } from '../../../core/models/filter-params.model';
import { FilterParametersService } from '../../../core/services/filter-parameters.service';

@Component({
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.scss'],
})
export class SpeciesPageComponent extends WindowWidth implements OnInit, OnDestroy {
  public drugsData: Experiment[] = [];
  public filtersOptions: Filters;
  public drugsPageOptions: PageOptions;
  public feedLayout: 'table' | 'cards';
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
      linewidth: 2
    },
  };

  private filterParams: Partial<FilterParamsModel>;
  private unsubscribe$ = new Subject();

  constructor(
    public windowWidthService: WindowWidthService,
    private filterParametersService: FilterParametersService,
    private experimentApiService: ExperimentApiService,
    private plotDataService: PlotDataService,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    super(windowWidthService);
  }

  ngOnInit(): void {
    this.getExperimentsData();

    this.initWindowWidth(() => {
      this.feedLayout = this.isMobile ? 'cards' : 'table';
      this.plotLayout.legend = {
        orientation: this.isMobile ? 'h' : '',
      };
    });

    this.detectWindowWidth(() => {
      this.feedLayout = this.isMobile ? 'cards' : 'table';
      this.plotLayout.legend = {
        orientation: this.isMobile ? 'h' : '',
      };
    });
  }

  // TODO: WIP
  public retrieveAndSetParams(next?: Function) {
    this.filterParametersService.getFiltersState()
      .pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe((res) => {
      const params = res;
      console.log(params);
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          if (params[key as FilterTypes]?.length === 0) {
            delete params[key as FilterTypes];
          } else if (params[key as FilterTypes] === undefined) {
            delete params[key as FilterTypes];
          }
        }
      }

      this.filterParams = params;
        console.log('params: ', this.filterParams);
    });

    if (next) {
      next.call(this);
    }
  }

  public getExperimentsData(): void {
    this.experimentApiService.getExperiments(this.filterParams ? this.filterParams : null)
      .pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe((res) => {
      this.drugsData = res.items;
      this.filtersOptions = res.filters;
      this.drugsPageOptions = res.options; // TODO: pagination
    });
    // TODO: Error handling
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setPlotData(drugIds: number[]): void {
    if (drugIds.length) {
      this.plotDataService.getPlotDataById(drugIds)
        .pipe()
        .subscribe((data) => {
          this.plotLayout.title = data.options?.chartsCategory;

          this.plotData = data.items.map((plot) => {
            return {
              name: plot.title,
              mode: plot.coordinates.mode,
              type: 'scatter',
              x: plot.coordinates.x,
              y: plot.coordinates.y,
            };
          });
        });
    } else {
      this.plotData = [];
    }
  }
}
