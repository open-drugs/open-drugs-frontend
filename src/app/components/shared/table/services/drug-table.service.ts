import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drug } from '../../../../core/models/api/drug.model';

@Injectable()
export class DrugTableService {
  private checkedDrugs = new BehaviorSubject<Drug[]>([]);

  constructor() { }

  updateCheckedDrugs(drugs: Drug[], event: boolean | number): void {
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

  getCheckedDrugs(): Observable<Drug[]> {
    return this.checkedDrugs.asObservable();
  }
}
