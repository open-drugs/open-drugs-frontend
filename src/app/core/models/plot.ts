export interface PlotData {
  items: PlotOptions[];
  options: {
    objTotal: number;
    chartsCategory: string;
  };
}

interface PlotOptions {
  name: string;
  mode: string;
  coordinates: {
    x: [];
    y: [];
  };
}
