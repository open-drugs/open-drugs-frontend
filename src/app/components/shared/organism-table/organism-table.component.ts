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
  @Input() drugsData: Experiment[];
  @Input() layout: 'table' | 'cards' = 'table';

  @Output() checkedIds: EventEmitter<number[]> = new EventEmitter<number[]>();

  private unsubscribe$ = new Subject();

  constructor(
    private drugTableService: OrganismTableService,
  ) {
  }

  ngOnInit(): void {
    this.getCheckedDrugs();
  }

  public checkboxStatesChange(event: boolean | number): void {
    this.drugTableService.updateCheckedDrugs(this.drugsData, event);
  }

  private getCheckedDrugs(): void {
    this.drugTableService.getCheckedDrugs()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((checkedDrugs) => {
        const checkedIds = checkedDrugs.map(drug => drug.id);
        this.checkedIds.emit(checkedIds);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
