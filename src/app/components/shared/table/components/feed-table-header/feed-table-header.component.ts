import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DrugTableService } from '../../services/drug-table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-feed-table-header',
  templateUrl: './feed-table-header.component.html',
  styleUrls: ['./feed-table-header.component.scss'],
})
export class FeedTableHeaderComponent implements OnInit, OnDestroy {
  public selectAll = false;

  private unsubscribe$ = new Subject();

  @Output() checkboxStates: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private drugTableService: DrugTableService,
  ) {
  }

  ngOnInit(): void {
    this.getCheckedDrugs();
  }

  public checkboxChanges(event: MatCheckboxChange): void {
    this.selectAll = event.checked;
    this.checkboxStates.emit(this.selectAll);
  }

  private getCheckedDrugs(): void {
    this.drugTableService.getCheckedDrugs()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((checkedDrugs) => {
        if (!checkedDrugs.length) {
          this.selectAll = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
