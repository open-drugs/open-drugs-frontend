import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiment } from '../../../../../core/models/api/experiment.model';
import { OrganismTableService } from '../../services/organism-table.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-organism-table-row',
  templateUrl: './organism-table-row.component.html',
  styleUrls: ['./organism-table-row.component.scss']
})
export class OrganismTableRowComponent implements OnInit {
  @Input() drug: Experiment;
  @Output() drugId: EventEmitter<number> = new EventEmitter<number>();

  public checkedIds: number[];

  private unsubscribe$ = new Subject();

  constructor(
    private organismTableService: OrganismTableService,
  ) { }

  ngOnInit(): void {
    this.organismTableService
      .getCheckedIds()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ids) => this.checkedIds = ids);
  }

  public checkboxChanges(id: number): void {
    this.drugId.emit(id);
  }
}
