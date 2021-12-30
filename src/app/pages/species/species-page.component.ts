import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlotDataService } from '../../core/services/plot-data.service';
import { takeUntil } from 'rxjs/operators';
import { ExperimentApiService } from '../../core/services/api/experiment-api.service';
import { Experiment } from '../../core/models/api/experiment.model';
import { PageOptions } from '../../core/models/api/response.model';
import { Subject } from 'rxjs';
import { WindowWidth } from '../../core/utils/window-width';
import { WindowWidthService } from '../../core/services/browser-view/window-width.service';

@Component({
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.scss'],
})
export class SpeciesPageComponent extends WindowWidth implements OnInit, OnDestroy {
  public drugsData: Experiment[] = [];
  public drugsPageOptions: PageOptions;

  public plotData: any[] = [];
  public layout = {
    autosize: true,
    showlegend: true,
    legend: {},
    title: '',
    xaxis: {
      rangemode: 'tozero',
      autorange: true,
      ticks: 'outside',
    },
    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      ticks: 'outside',
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
      this.layout.legend = {
        orientation: this.isMobile ? 'h' : '',
      };
    });

    this.detectWindowWidth(() => {
      this.layout.legend = {
        orientation: this.isMobile ? 'h' : '',
      };
    });
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

  setPlotData(drugIds: number[]): void {

    if (drugIds.length) {
      this.plotDataService.getPlotDataById(drugIds)
        .pipe()
        .subscribe((data) => {
          this.layout.title = data.options?.chartsCategory;

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
