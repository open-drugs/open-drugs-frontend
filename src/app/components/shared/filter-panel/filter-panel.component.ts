import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FilterParamsModel, FilterTypes } from '../../../core/models/filter-params.model';
import { Filters, Intervention } from '../../../core/models/api/filters.model';
import { Subject } from 'rxjs';
import { FilterParametersService } from '../../../core/services/filter-parameters.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent {
  public filtersForm: FormGroup;
  // FILTERS
  // Intervention types
  public selectedInterventionType = '';
  public interventionTypes: any[] | any | null;
  // Intervention type - interventions
  public selectedInterventions = [];
  public interventions: any[] | any | null;
  // Species
  public selectedSpecies: any;
  public species: any[] | any | null;

  private subscription$ = new Subject;

  @Input() filters: Filters;
  @Output() filterApplied: EventEmitter<{name: string, value: any}> = new EventEmitter<{name: string, value: any}>();

  constructor(
    private filterParametersService: FilterParametersService,
  ) {
    this.filtersForm = new FormGroup({
      interventionTypeSelect: new FormControl(['', Validators.minLength(1)]),
      interventionsSelect: new FormControl([[], null]),
      speciesSelect: new FormControl(['', null]),
    });
  }

  ngOnInit(): void {
    // FILTERS
    // Intervention types
    this.interventionTypes = this.getEntitiesList('interventionType');
    this.filterParametersService.retrieveQueryParamFromUrl('interventionType')
      .pipe(takeUntil(this.subscription$))
      .subscribe((res) => {
        this.selectedInterventionType = res;
      });

    // Interventions
    this.pickInterventions();

    // Species
    this.species = this.getEntitiesList('species');
    this.filterParametersService.retrieveQueryParamFromUrl('species')
      .pipe(takeUntil(this.subscription$))
      .subscribe((res) => {
        this.selectedSpecies = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription$.complete();
  }

  /**
   * Check if values being passed into a select control exist in options array
   */

  public compareSelectValues(value1: any | any[], value2: any): boolean {
    if (value1 && value2) {
      return value1 === value2;
    }
    return false;
  }

  /**
   * Get entities for filters lists
   */

  private getEntitiesList(key: FilterTypes): any[] | any | null {
    if (this.filters && this.filters[key]) {
      return this.filters[key];
    }

    return null;
  }

  public resetForm(): void {
    this.filtersForm.reset();
  }

  /**
   * Apply filter values
   */

  apply(key: FilterTypes, $event: MatSelectChange, callback?: Function) {
    let value = $event.value;
    if (Array.isArray($event.value)) {
      value = $event.value[0];
    }

    this.filterParametersService.applyQueryParams(key, value);
    this.filterApplied.emit({name: key, value: value});
    if (callback) {
      callback.call(this);
    }
  }

  public pickInterventions() {
    // Cancel interventions' selected option before
    this.selectedInterventions = [];
    this.filterApplied.emit({name: 'interventions', value: []})
    // Show a list of interventions filtered by a 'type' field
    const interventions = this.getEntitiesList('intervention');
    this.interventions = interventions.filter((intervention: Intervention) => intervention?.type == this.selectedInterventionType);
    this.filterParametersService.retrieveQueryParamFromUrl('intervention')
      .pipe(takeUntil(this.subscription$))
      .subscribe((res) => {
        this.selectedInterventions = res;
      });
  }
}
