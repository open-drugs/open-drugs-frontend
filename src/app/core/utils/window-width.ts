import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WindowWidthService } from '../services/browser-view/window-width.service';

@Directive()
export abstract class WindowWidth implements OnDestroy{
  public isMobile: boolean;
  public isTouchDevice = false;
  public subscription$ = new Subject();

  private breakpoints = {
    desktop: 1199.98,
  };

  protected constructor(
    protected windowWidthService: WindowWidthService,
  ) {
    if ('ontouchstart' in document.documentElement) {
      this.isTouchDevice = true;
    }
  }

  protected initWindowWidth(callback: any): void {
    this.windowWidthService
      .setWindowWidth()
      .pipe(
        takeUntil(this.subscription$)
      )
      .subscribe((width) => {
        this.isMobile = width <= this.breakpoints.desktop;
        callback();
      });
  }

  protected detectWindowWidth(callback: any): void {
    this.windowWidthService.windowWidth$
      .pipe(
        takeUntil(this.subscription$)
      )
      .subscribe((width) => {
        this.isMobile = width <= this.breakpoints.desktop;
        callback();
      });
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}

