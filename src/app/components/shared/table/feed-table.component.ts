import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DrugTableService } from './services/drug-table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Drug } from '../../../core/models/api/drug.model';

@Component({
  selector: 'app-feed-table',
  templateUrl: './feed-table.component.html',
  styleUrls: ['./feed-table.component.scss'],
  providers: [DrugTableService],
})
export class FeedTableComponent implements OnInit, OnDestroy {
  @Input() drugsData: Drug[];
  public checkedDrugs: Drug[] = [];

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
        this.checkedDrugs = checkedDrugs;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
