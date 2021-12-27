import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterForm: FormGroup;

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    this.filterForm = new FormGroup({
      year: new FormControl(''),
      sex: new FormControl('')
    });
  }
}
