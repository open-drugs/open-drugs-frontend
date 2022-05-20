import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { OrganismTableService } from './services/organism-table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Experiment } from '../../../core/models/api/experiment.model';

@Component({
  selector: 'app-organism-table',
  templateUrl: './organism-table.component.html',
  styleUrls: ['./organism-table.component.scss'],
  providers: [OrganismTableService],
})
export class OrganismTableComponent implements OnInit, OnDestroy {
  @Input() experimentsData: Experiment[];
  @Input() layout: 'table' | 'cards' = 'table';
  @Output() checkedIds: EventEmitter<number[]> = new EventEmitter<number[]>();

  public selectAll = false;
  public selectedIds: number[] = [];
  private unsubscribe$ = new Subject();

  constructor(
    private drugTableService: OrganismTableService,
  ) {
  }

  ngOnInit(): void {
    this.getCheckedDrugs();
  }

  public selectAllState(event: boolean): void {
    this.drugTableService.selectAllDrugs(this.experimentsData, event);
  }

  public checkboxStatesChange(event: number): void {
    this.drugTableService.updateCheckedDrugs(this.experimentsData, event);
  }

  private getCheckedDrugs(): void {
    this.drugTableService.getCheckedIds()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((checkedIds) => {
        this.selectAll = checkedIds.length > 0 && checkedIds.length === this.experimentsData.length;
        this.selectedIds = checkedIds;
        this.checkedIds.emit(checkedIds);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
