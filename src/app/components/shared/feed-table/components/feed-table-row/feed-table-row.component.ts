import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feed-table-row',
  templateUrl: './feed-table-row.component.html',
  styleUrls: ['./feed-table-row.component.scss']
})
export class FeedTableRowComponent  {
  @Input() data: any; // TODO: typing
  constructor() { }
}
