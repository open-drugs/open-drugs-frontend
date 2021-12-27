import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilterService } from '../../core/services/filter.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {
  public filterForm: FormGroup;

  constructor(
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.filterService.filterForm;
  }

  public resetForm(): void {
    this.filterForm.reset();
  }

}
