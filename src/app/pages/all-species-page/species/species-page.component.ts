import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WindowWidth } from '../../../core/utils/window-width';
import { Experiment } from '../../../core/models/api/experiment.model';
import { PageOptions } from '../../../core/models/api/response.model';
import { WindowWidthService } from '../../../core/services/browser/window-width.service';
import { ExperimentApiService } from '../../../core/services/api/experiment-api.service';
import { PlotDataService } from '../../../core/services/api/plot-data.service';
import { Filters } from '../../../core/models/api/filters.model';
import { FilterParams } from '../../../core/models/filter-params';
import { MatSelectChange } from '@angular/material/select';

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

  private unsubscribe$ = new Subject();

  constructor(
    public windowWidthService: WindowWidthService,
    private experimentApiService: ExperimentApiService,
    private plotDataService: PlotDataService,
  ) {
    super(windowWidthService);
  }

  ngOnInit(): void {
    this.getDrugs();


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

  public getDrugs(param: {name: string, value: any} | null = null): void {
    let queryParams = '';
    if (param) {
      queryParams = `${param.name}=${param.value}`;
    }
    console.log('getDrugs()');
    console.log('params: ', param);
    this.experimentApiService.getDrugs(`?${queryParams}`)
      .pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe((res) => {
      this.drugsData = res.items;
      this.filtersOptions = res.filters;
      this.drugsPageOptions = res.options; // TODO: pagination
    });
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
