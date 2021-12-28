import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Drug } from '../../../../../core/models/api/drug.model';

@Component({
  selector: 'app-feed-table-row',
  templateUrl: './feed-table-row.component.html',
  styleUrls: ['./feed-table-row.component.scss']
})
export class FeedTableRowComponent implements OnInit {
  @Input() drug: Drug;

  @Output() drugId: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  public checkboxChanges(id: number): void {
    this.drugId.emit(id);
  }

}
