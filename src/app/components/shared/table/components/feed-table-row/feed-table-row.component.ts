import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiment } from '../../../../../core/models/api/experiment.model';

@Component({
  selector: 'app-feed-table-row',
  templateUrl: './feed-table-row.component.html',
  styleUrls: ['./feed-table-row.component.scss']
})
export class FeedTableRowComponent implements OnInit {
  @Input() drug: Experiment;

  @Output() drugId: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  public checkboxChanges(id: number): void {
    this.drugId.emit(id);
  }

}
