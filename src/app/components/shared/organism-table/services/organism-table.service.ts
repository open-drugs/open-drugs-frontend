import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Experiment } from '../../../../core/models/api/experiment.model';

@Injectable({
  providedIn: 'root'
})
export class OrganismTableService {
  private checkedIds: number[] = [];
  private checkedExperimentIds = new BehaviorSubject<number[]>(this.checkedIds);

  constructor() { }

  getCheckedIds(): Observable<number[]> {
    return this.checkedExperimentIds.asObservable();
  }

  updateCheckedDrugs(drugs: Experiment[], drugId: number): void {
    if (!this.checkedIds.includes(drugId)) {
      this.checkedIds.push(drugId);
    } else {
      this.checkedIds = this.checkedIds.filter((id) => id !== drugId);
    }

    this.updateIds(this.checkedIds);
  }

  selectAllDrugs(drugs: Experiment[], selected: boolean): void {
    this.checkedIds = selected ? drugs.map((drug) => drug.id) : [];
    this.updateIds(this.checkedIds);
  }

  setCheckedIds(ids: number[]): void {
    this.checkedIds = ids;
    this.updateIds(ids);
  }

  private updateIds(ids: number[]): void {
    this.checkedExperimentIds.next(ids);
  }

}
