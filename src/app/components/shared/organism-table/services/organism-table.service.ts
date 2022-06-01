import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Experiment } from '../../../../core/models/api/experiment.model';

@Injectable({
  providedIn: 'root'
})
export class OrganismTableService {
  private checkedIds: number[] = [];
  private checkedExperimentIds = new ReplaySubject<number[]>(1);

  constructor() { }

  getCheckedIds(): Observable<number[]> {
    return this.checkedExperimentIds;
  }

  updateCheckedDrugs(drugs: Experiment[], drugId: number): void {
    if (!this.checkedIds.includes(drugId)) {
      this.checkedIds.push(drugId);
    } else {
      this.checkedIds = this.checkedIds.filter((id) => id !== drugId);
    }

    this.setCheckedIds(this.checkedIds);
  }

  selectAllDrugs(drugs: Experiment[], selected: boolean): void {
    this.checkedIds = selected ? drugs.map((drug) => drug.id) : [];
    this.setCheckedIds(this.checkedIds);
  }

  setCheckedIds(ids: number[]): void {
    this.checkedIds = ids;
    this.checkedExperimentIds.next(ids);
  }
}
