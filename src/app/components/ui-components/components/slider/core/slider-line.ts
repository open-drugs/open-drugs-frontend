import { ElementRef, Renderer2 } from '@angular/core';

export class SliderLine {
  constructor(private lineElement: ElementRef, private renderer: Renderer2) { }

  setLineSize(left: number, right: number): void{
    this.renderer.setStyle(this.lineElement.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.lineElement.nativeElement, 'width', `${right - left}px`);
  }
}
