import { Component, OnDestroy, OnInit } from '@angular/core';
import { MockApiService } from '../../../core/services/api/mock-api.service';
import { Experiment } from '../../../core/models/api/experiment.model';
import { DrugTableService } from './services/drug-table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-feed-table',
  templateUrl: './feed-table.component.html',
  styleUrls: ['./feed-table.component.scss'],
  providers: [DrugTableService],
})
export class FeedTableComponent implements OnInit, OnDestroy {
  public drugsData: Experiment[] = [];
  public checkedDrugs: Experiment[] = [];

  private unsubscribe$ = new Subject();

  constructor(
    private mockApiService: MockApiService,
    private drugTableService: DrugTableService,
  ) {
  }

  ngOnInit(): void {
    this.getDrugs();
    this.getCheckedDrugs();
  }

  public checkboxStatesChange(event: boolean | number): void {
    this.drugTableService.updateCheckedDrugs(this.drugsData, event);
  }

  private getDrugs(): void {
    this.mockApiService.getMockResponse()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((data) => {
        this.drugsData = data.items;
      });
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
