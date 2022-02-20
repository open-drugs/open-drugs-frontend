import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { ISliderButtonOptions } from '../../model/slider-button-options.interface';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IntervalButtonPositionResolver } from '../../core/interval-button-position.resolver';
import { ISliderOptions } from '../../model/slider-value-options.interface';

@Component({
  selector: 'app-interval',
  templateUrl: './app-interval.component.html',
  styleUrls: ['./app-interval.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppIntervalComponent implements AfterViewInit, OnDestroy {

  @Input()
  minValue: number;

  @Input()
  maxValue: number;

  @Input()
  sliderStep: number;

  @Input()
  value: number;

  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  sliderSmooth = true;

  @Input()
  @HostBinding('class.__disabled')
  isDisabled = false;

  @ViewChild('sliderContainer', { static: true })
  sliderContainer: ElementRef;

  @ViewChild('sliderButton', { static: true })
  button: ElementRef;

  private resizeEvent$: Observable<Event>;
  private buttonPositionResolver: IntervalButtonPositionResolver;
  private buttonOptions: ISliderButtonOptions = {
    clickedClass: '__pressed'
  };
  private ngUnsubscribeSubject = new Subject<void>();
  ngUnsubscribe$ = this.ngUnsubscribeSubject.asObservable();

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.initSlider();
    this.subscribeOnResize();
  }

  ngOnDestroy(): void {
    this.buttonPositionResolver.onDestroy();
  }

  private subscribeOnResize(): void {
    this.resizeEvent$ = fromEvent(window, 'resize');
    this.ngZone.runOutsideAngular(() => {
      this.resizeEvent$.pipe(
        debounceTime(200),
        takeUntil(this.ngUnsubscribe$)
      ).subscribe((): void => {
        this.buttonPositionResolver.onDestroy();
        this.initSlider();
      });
    });
  }

  initSlider(): void {
    const t = this.getSliderOptions();
    this.buttonPositionResolver = new IntervalButtonPositionResolver(
      this.button,
      this.sliderContainer,
      t,
      this.buttonOptions,
      this.renderer);

    this.buttonPositionResolver.value$
      .subscribe(value => this.change.emit(value));

  }

  private getSliderOptions(): ISliderOptions {
    return {
      minValue: this.minValue,
      maxValue: this.maxValue,
      step: this.sliderStep,
      startInitialValue: this.value,
      endInitialValue: this.value,
      buttonOffset: this.getElementSize(this.button) / 2,
      containerSize: this.getElementSize(this.sliderContainer),
      smooth: this.sliderSmooth
    };
  }

  private getElementSize(element: ElementRef): number {
    const rect = element.nativeElement.getBoundingClientRect();
    return rect.right - rect.left;
  }

}
