import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiment } from '../../../../../core/models/api/experiment.model';

@Component({
  selector: 'app-organism-table-row',
  templateUrl: './organism-table-row.component.html',
  styleUrls: ['./organism-table-row.component.scss']
})
export class OrganismTableRowComponent implements OnInit {
  @Input() drug: Experiment;

  @Output() drugId: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  public checkboxChanges(id: number): void {
    this.drugId.emit(id);
  }
}
