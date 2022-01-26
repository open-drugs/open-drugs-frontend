import { ElementRef, Renderer2 } from '@angular/core';
import { ISliderOptions } from '../model/slider-value-options.interface';
import { SliderButton } from './slider-button';
import { SliderLine } from './slider-line';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ISliderButtonOptions } from '../model/slider-button-options.interface';
import { takeUntil } from 'rxjs/operators';


export class ButtonPositionResolver {

  get startValue$(): Observable<number> {
    return this.startButton.value$;
  }

  get endValue$(): Observable<number> {
    return this.endButton.value$;
  }

  private destroy$ = new Subject<void>();
  private startButton: SliderButton;
  private endButton: SliderButton;
  private sliderLine: SliderLine;

  constructor(
    private startButtonElement: ElementRef,
    private endButtonElement: ElementRef,
    private sliderContainerElement: ElementRef,
    private sliderLineElement: ElementRef,
    private renderer: Renderer2,
    private sliderOptions: ISliderOptions,
    sliderButtonOptions: ISliderButtonOptions
  ) {

    this.startButton = new SliderButton(this.startButtonElement,
      this.sliderOptions,
      sliderButtonOptions,
      this.startButtonLimitStrategy,
      this.renderer);

    this.endButton = new SliderButton(this.endButtonElement,
      this.sliderOptions,
      sliderButtonOptions,
      this.endButtonLimitStrategy,
      this.renderer);

    this.sliderLine = new SliderLine(this.sliderLineElement, this.renderer);

    this.startButton.registerEventListeners(this.sliderContainerElement);
    this.endButton.registerEventListeners(this.sliderContainerElement);

    combineLatest(this.startButton.position$, this.endButton.position$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([left, right]: [number, number]) => {
        this.sliderLine.setLineSize(left, right);
      });

    this.startButton.setInitialPositionByValue(this.sliderOptions.startInitialValue);
    this.endButton.setInitialPositionByValue(this.sliderOptions.endInitialValue);
  }

  onDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.startButton.onDestroy();
    this.endButton.onDestroy();
  }


  private startButtonLimitStrategy = (x: number): number => {
    switch (true) {
      case x < 0:
        return 0;
      case x >= this.endButton.position:
        this.startButton.endMove();
        this.endButton.startMove();
        return this.endButton.position;
      default:
        return x;
    }
  }

  private endButtonLimitStrategy = (x: number): number => {
    switch (true) {
      case x <= this.startButton.position:
        this.endButton.endMove();
        this.startButton.startMove();
        return this.startButton.position;
      case x > this.sliderOptions.containerSize:
        return this.sliderOptions.containerSize;
      default:
        return x;
    }
  }
}
