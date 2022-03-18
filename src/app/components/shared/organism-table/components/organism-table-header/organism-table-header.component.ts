import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-organism-table-header',
  templateUrl: './organism-table-header.component.html',
  styleUrls: ['./organism-table-header.component.scss'],
})
export class OrganismTableHeaderComponent {
  @Input() selectAll: boolean;
  @Output() selectAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  public checkboxChanges(event: MatCheckboxChange): void {
    this.selectAll = event.checked;
    this.selectAllChange.emit(this.selectAll);
  }
}
