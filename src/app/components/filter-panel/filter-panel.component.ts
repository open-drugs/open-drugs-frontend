import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  public filterForm: FormGroup;

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    debugger;
    this.filterForm.valueChanges.subscribe((form) => {
      console.log(form);
    })
  }

  initForm(): void {
    this.filterForm = new FormGroup({
      year: new FormControl('2021'),
      sex: new FormControl(['all'])
    });
  }

}
