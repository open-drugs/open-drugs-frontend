import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feed-table',
  templateUrl: './feed-table.component.html',
  styleUrls: ['./feed-table.component.scss'],
})
export class FeedTableComponent {
  @Input() data: any;
  @Input() layout: 'table' | 'cards' = 'table';

  constructor(
  ) {
  }
}
