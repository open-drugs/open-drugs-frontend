import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSliderComponent } from './components/slider/app-slider.component';
import { AppIntervalComponent } from './components/interval/app-interval.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppSliderComponent, AppIntervalComponent],
  exports: [AppSliderComponent, AppIntervalComponent]
})
export class AppSliderModule { }

export { AppSliderComponent };
export { AppIntervalComponent };
