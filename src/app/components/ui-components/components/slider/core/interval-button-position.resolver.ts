import { SliderButton } from './slider-button';
import { ElementRef, Renderer2 } from '@angular/core';
import { ISliderOptions } from '../model/slider-value-options.interface';
import { ISliderButtonOptions } from '../model/slider-button-options.interface';
import { Observable } from 'rxjs';

export class IntervalButtonPositionResolver {
  private button: SliderButton;
  private buttonLimitStrategy = (position: number): number => {
    switch (true) {
      case position < 0:
        return 0;
      case position > this.sliderOptions.containerSize:
        return this.sliderOptions.containerSize;
      default:
        return position;
    }

  };

  get value$(): Observable<number> {
    return this.button.value$;
  }

  constructor(
    private buttonElement: ElementRef,
    private sliderContainerElement: ElementRef,
    private sliderOptions: ISliderOptions,
    private sliderButtonOptions: ISliderButtonOptions,
    private renderer: Renderer2
  ) {

    this.button = new SliderButton(this.buttonElement,
      this.sliderOptions,
      sliderButtonOptions,
      this.buttonLimitStrategy,
      this.renderer);

    this.button.registerEventListeners(this.sliderContainerElement);

    this.button.setInitialPositionByValue(this.sliderOptions.startInitialValue);

  }

  onDestroy(): void {
    this.button.onDestroy();
  }
}
