import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { OrganismTableService } from '../../services/organism-table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-organism-table-header',
  templateUrl: './organism-table-header.component.html',
  styleUrls: ['./organism-table-header.component.scss'],
})
export class OrganismTableHeaderComponent implements OnInit, OnDestroy {
  @Input() selectAll: boolean;
  @Output() selectAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private unsubscribe$ = new Subject();

  @Output() checkboxStates: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private drugTableService: OrganismTableService,
  ) {
  }

  ngOnInit(): void {
    this.getCheckedDrugs();
  }

  public checkboxChanges(event: MatCheckboxChange): void {
    this.selectAll = event.checked;
    this.selectAllChange.emit(this.selectAll);
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
