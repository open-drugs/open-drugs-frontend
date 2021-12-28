import { Component } from '@angular/core';
import { PlotDataService } from '../../core/services/plot-data.service';

@Component({
  selector: 'app-species-page',
  templateUrl: './species-page.component.html',
  styleUrls: ['./species-page.component.scss'],
})
export class SpeciesPageComponent {
  public data: any[];
  public layout = {
    autosize: true,
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
    private plotDataService: PlotDataService,
  ) {
    this.setPlotData();
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
