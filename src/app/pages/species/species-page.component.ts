import { Component, OnInit } from '@angular/core';
import { PlotDataService } from '../../core/services/plot-data.service';
import { WindowWidth } from '../../core/utils/window-width';
import { WindowWidthService } from '../../core/services/browser-view/window-width.service';

@Component({
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.scss'],
})
export class SpeciesPageComponent extends WindowWidth implements OnInit {
  public data: any[];
  public layout = {
    autosize: true,
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
    }
  };

  constructor(
    public windowWidthService: WindowWidthService,
    private plotDataService: PlotDataService,
  ) {
    super(windowWidthService);
  }

  ngOnInit(): void {
    this.setPlotData();

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

  setPlotData(): void {
    this.plotDataService.getPlotData()
      .pipe()
      .subscribe((data) => {
        this.layout.title = data.options?.chartsCategory;

        this.data = data.items.map((plot) => {
          return {
            name: plot.name,
            mode: plot.mode,
            type: 'scatter',
            x: plot.coordinates.x,
            y: plot.coordinates.y,
          };
        });
      });
  }
}
