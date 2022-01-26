import { ElementRef, Renderer2 } from '@angular/core';
import { ISliderOptions } from '../model/slider-value-options.interface';
import { ISliderButtonOptions } from '../model/slider-button-options.interface';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export class SliderButton {

  get position$(): Observable<number> {
    return this.positionSubject.asObservable().pipe(distinctUntilChanged());
  }

  get value$(): Observable<number> {
    return this.valueSubject.asObservable();
  }

  get position(): number {
    return this.buttonPosition;
  }
  set position(value: number) {
    this.buttonPosition = value;
    this.positionSubject.next(value);
  }


  get value(): number {
    return this.buttonValue;
  }
  set value(value: number) {
    this.buttonValue = value;
    this.valueSubject.next(value + this.sliderOptions.minValue);
  }

  private readonly upEvents: string[] = ['mouseup', 'touchend'];
  private readonly downEvents: string[] = ['mousedown', 'touchstart'];
  private readonly moveEvents: string[] = ['mousemove', 'touchmove'];

  private mouseDownHandler: (event: Event) => void;
  private positionSubject = new Subject<number>();
  private valueSubject = new Subject<number>();
  private buttonPosition: number;
  private buttonValue: number;

  constructor(
    private button: ElementRef,
    private sliderOptions: ISliderOptions,
    private buttonOptions: ISliderButtonOptions,
    private limitStrategyFunc: { (x: number): number; (x: number): number; (position: number): number; (arg0: number): number; },
    private renderer: Renderer2) { }

  registerEventListeners(container: ElementRef): void {
    this.button.nativeElement.ondragstart = () => false;

    const mouseMove = (event: any): void => {
      let clientX: number;

      switch (true) {
        case !!event.clientX:
          clientX = (event as MouseEvent)?.clientX;
          break;
        case !!event.touches:
          clientX = (event as TouchEvent)?.touches[0]?.clientX;
          break;
        default:
          clientX = 0;
      }

      let x = clientX - container.nativeElement.getBoundingClientRect().left;

      x = this.limitStrategyFunc(x);

      const value = this.getValueFromPosition(x);

      if (!this.sliderOptions.smooth) {
        x = this.getPositionFromValue(value);
      }

      this.setButtonPosition(x);
      this.position = x;
      this.value = value;
    };

    const mouseUp = (): void => {
      this.moveEvents.forEach(e => window.removeEventListener(e, mouseMove));
      this.upEvents.forEach(e => window.removeEventListener(e, mouseUp));

      this.renderer.removeClass(this.button.nativeElement, this.buttonOptions.clickedClass);
    };

    this.mouseDownHandler = (event: Event): void => {
      this.moveEvents.forEach(e => window.addEventListener(e, mouseMove));
      this.upEvents.forEach(e => window.addEventListener(e, mouseUp));
      this.renderer.addClass(this.button.nativeElement, this.buttonOptions.clickedClass);
      event.preventDefault();
    };

    this.downEvents.forEach(e => this.button.nativeElement.addEventListener(e, this.mouseDownHandler));
  }

  onDestroy(): void {
    this.downEvents.forEach(e => this.button.nativeElement.removeEventListener(e, this.mouseDownHandler));
    this.positionSubject.complete();
    this.valueSubject.complete();
  }

  setInitialPositionByValue(value: number): void {
    const x = this.getPositionFromValue(value);
    this.setButtonPosition(x);
    this.position = x;
    this.value = value;
  }

  startMove(): void {
    const events = this.createEvents(this.downEvents);
    events.forEach(event => this.button.nativeElement.dispatchEvent(event));
  }

  endMove(): void {
    const events = this.createEvents(this.upEvents);
    events.forEach(event => this.button.nativeElement.dispatchEvent(event));
  }

  private createEvents(eventNames: string[]): Event[] {
    const events: Event[] = [];
    eventNames.forEach(name => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent(name, true, true);
      events.push(event);
    });
    return events;
  }

  private getValueFromPosition = (x: number): number => {
    const { maxValue, minValue, step, containerSize } = this.sliderOptions;
    let value = (x * (maxValue - minValue)) / containerSize;
    value = Math.round(value / step) * step;
    return value;
  };

  private getPositionFromValue = (value: number): number => {
    const { maxValue, minValue, containerSize } = this.sliderOptions;
    return ((value - minValue) * containerSize) / (maxValue - minValue);
  };

  private setButtonPosition(x: number): void {
    this.renderer.setStyle(this.button.nativeElement, 'left', `${x - this.sliderOptions.buttonOffset}px`);
  }
}
