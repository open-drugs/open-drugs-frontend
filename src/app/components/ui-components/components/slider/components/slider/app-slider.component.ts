import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
  OnDestroy,
  NgZone,
  ChangeDetectionStrategy,
  AfterViewInit,
  HostBinding
} from '@angular/core';
import { ButtonPositionResolver } from '../../core/button-position.resolver';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ISliderButtonOptions } from '../../model/slider-button-options.interface';
import { ISliderOptions } from '../../model/slider-value-options.interface';

@Component({
  selector: 'app-slider',
  templateUrl: './app-slider.component.html',
  styleUrls: ['./app-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSliderComponent implements AfterViewInit, OnDestroy {

  @Input()
  minValue: number;

  @Input()
  maxValue: number;

  @Input()
  sliderStep: number;

  @Input()
  minCurrentValue: number;

  @Output()
  minCurrentValueChange = new EventEmitter<number>();

  @Input()
  maxCurrentValue: number;

  @Output()
  maxCurrentValueChange = new EventEmitter<number>();

  @Input()
  sliderSmooth = true;

  @Input()
  @HostBinding('class.__disabled')
  isDisabled = false;

  @ViewChild('sliderContainer', { static: true })
  sliderContainer: ElementRef;

  @ViewChild('startButton', { static: true })
  startButton: ElementRef;

  @ViewChild('endButton', { static: true })
  endButton: ElementRef;

  @ViewChild('sliderLine', { static: true })
  sliderLine: ElementRef;

  private resizeEvent$: Observable<Event>;
  private buttonPositionResolver: ButtonPositionResolver;
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
    this.buttonPositionResolver = new ButtonPositionResolver(
      this.startButton,
      this.endButton,
      this.sliderContainer,
      this.sliderLine,
      this.renderer,
      t,
      this.buttonOptions);

    this.buttonPositionResolver.startValue$
      .pipe(debounceTime(200))
      .subscribe(value => this.minCurrentValueChange.emit(value));

    this.buttonPositionResolver.endValue$
      .pipe(debounceTime(200))
      .subscribe(value => this.maxCurrentValueChange.emit(value));
  }

  private getSliderOptions(): ISliderOptions {
    return {
      minValue: this.minValue,
      maxValue: this.maxValue,
      step: this.sliderStep,
      startInitialValue: this.minCurrentValue,
      endInitialValue: this.maxCurrentValue,
      buttonOffset: this.getElementSize(this.startButton) / 2,
      containerSize: this.getElementSize(this.sliderContainer),
      smooth: this.sliderSmooth
    };
  }

  private getElementSize(element: ElementRef): number {
    const rect = element.nativeElement.getBoundingClientRect();
    return rect.right - rect.left;
  }
}
