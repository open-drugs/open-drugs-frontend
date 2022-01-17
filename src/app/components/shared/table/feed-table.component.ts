import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DrugTableService } from './services/drug-table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Experiment } from '../../../core/models/api/experiment.model';

@Component({
  selector: 'app-feed-table',
  templateUrl: './feed-table.component.html',
  styleUrls: ['./feed-table.component.scss'],
  providers: [DrugTableService],
})
export class FeedTableComponent implements OnInit, OnDestroy {
  @Input() drugsData: Experiment[];
  @Input() layout: 'table' | 'cards';

  @Output() checkedIds: EventEmitter<number[]> = new EventEmitter<number[]>();

  private unsubscribe$ = new Subject();

  constructor(
    private drugTableService: DrugTableService,
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
