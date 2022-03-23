import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Experiment } from '../../../../../core/models/api/experiment.model';

@Component({
  selector: 'app-organism-table-row',
  templateUrl: './organism-table-row.component.html',
  styleUrls: ['./organism-table-row.component.scss']
})
export class OrganismTableRowComponent {
  @Input() drug: Experiment;
  @Input() selectedIds: number[];
  @Output() drugId: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  public checkboxChanges(id: number): void {
    this.drugId.emit(id);
  }
}
