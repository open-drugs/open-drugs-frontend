import { Injectable } from '@angular/core';
import { Experiment } from '../../../../core/models/api/experiment.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DrugTableService {
  private checkedDrugs = new BehaviorSubject<Experiment[]>([]);

  constructor() { }

  updateCheckedDrugs(drugs: Experiment[], event: boolean | number): void {
    drugs.forEach((drug) => {
      if (typeof event === 'number') {
        if (drug.id === event) {
          drug.checked = !drug.checked;
        }
      } else {
        drug.checked = event;
      }
    });

    if (drugs.length) {
      const checked = drugs.filter((drug) => drug.checked);
      this.checkedDrugs.next(checked);
    }
  }

  getCheckedDrugs(): Observable<Experiment[]> {
    return this.checkedDrugs.asObservable();
  }
}
