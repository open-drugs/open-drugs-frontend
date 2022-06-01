import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Experiment } from '../../../../../core/models/api/experiment.model';

@Component({
  selector: 'app-organism-table-row',
  templateUrl: './organism-table-row.component.html',
  styleUrls: ['./organism-table-row.component.scss']
})
export class OrganismTableRowComponent {
  @Input() experiment: Experiment;
  @Input() selectedIds: number[];
  @Output() experimentId: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  public checkboxChanges(id: number): void {
    this.experimentId.emit(id);
  }
}
