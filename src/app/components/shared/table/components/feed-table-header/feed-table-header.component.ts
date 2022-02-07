import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-feed-table-header',
  templateUrl: './feed-table-header.component.html',
  styleUrls: ['./feed-table-header.component.scss'],
})
export class FeedTableHeaderComponent implements OnInit {
  @Input() selectAll: boolean;

  @Output() selectAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {}

  public checkboxChanges(event: MatCheckboxChange): void {
    this.selectAll = event.checked;
    this.selectAllChange.emit(this.selectAll);
  }


}
