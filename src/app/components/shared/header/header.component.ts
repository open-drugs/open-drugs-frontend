import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WindowWidth } from '../../../core/utils/window-width';
import { WindowWidthService } from '../../../core/services/browser-view/window-width.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends WindowWidth implements OnInit {

  constructor(
    protected windowWidthService: WindowWidthService,
    private cdRef: ChangeDetectorRef
  ) {
    super(windowWidthService);
  }

  ngOnInit(): void {
    this.initWindowWidth(() => {
      this.cdRef.markForCheck();
    });

    this.detectWindowWidth(() => {
      this.cdRef.markForCheck();
    });
  }
}
