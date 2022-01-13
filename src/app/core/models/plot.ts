export interface PlotData<T> {
  items: T[];
  options: {
    objTotal: number;
    chartsCategory: string;
  };
}

export interface PlotOptions {
  title: string;
  coordinates: {
    mode: string;
    x: [];
    y: [];
  };
}
