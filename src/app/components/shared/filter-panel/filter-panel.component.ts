import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FilterTypes } from '../../../core/models/filter-params';
import { Filters } from '../../../core/models/api/filters.model';
import { Subject } from 'rxjs';
import { FilterParametersService } from '../../../core/services/filter-parameters.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent
{
  public filtersForm: FormGroup;
  public predefinedInterventionTypes = [];
  public interventionTypes: any[] | any | null;
  private subscription$ = new Subject;

  @Input() filters: Filters;
  @Output() filterApplied: EventEmitter<{name: string, value: any}> = new EventEmitter<{name: string, value: any}>();

  constructor(
    private filterParametersService: FilterParametersService,
  ) {
    this.filtersForm = new FormGroup({
      interventionTypeSelect: new FormControl([[], [Validators.minLength(1)]]),
      // expressionChangeSelect: new FormControl([[], null]),
      // diseasesSelect: new FormControl([[], [Validators.minLength(1)]]),
    });
  }

  ngOnInit(): void {
    console.log('interventionTypes', this.interventionTypes);
    // FILTERS
    // Age-related processes
    this.interventionTypes = this.getEntitiesList('byInterventionType');

    this.filterParametersService.retrievequeryParamFromUrl('byInterventionType')
      .pipe(takeUntil(this.subscription$))
      .subscribe((res) => {
        console.log('interventionTypes res', res);
        this.predefinedInterventionTypes = res;
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
      return value1.id === value2.id;
    }
    return false;
  }

  /**
   * Get entities for filters lists
   */

  private getEntitiesList(key: FilterTypes): any[] | any | null {
    if (this.filters) {
      switch (key) {
        case 'byInterventionType':
          return this.filters.interventionType;
        case 'byIntervention':
          return this.filters.intervention;
        case 'bySpecies':
          return this.filters.species;
        case 'byStrain':
          return this.filters.strain;
        case 'byAvgLifespanChangePercent':
          return this.filters.avgLifespanChangePercent;
        case 'byMaxLifespanChangePercent':
          return this.filters.maxLifespanChangePercent;
        case 'byAvgLifespan':
          return this.filters.avgLifespan;
        case 'byMaxLifespan':
          return this.filters.maxLifespan;
        case 'byYear':
          return this.filters.year;
        default:
          return null;
      }
    }

    return null;
  }

  public resetForm(): void {
    this.filtersForm.reset();
  }

  /**
   * Apply filter values
   */

  apply(key: FilterTypes, $event: MatSelectChange) {
    this.filterParametersService.storeQuery(`${key}=${$event.value.toString().split(',')}`)
    this.filterApplied.emit({name: key, value: $event.value});
  }

  // this.filtersForm.valueChanges
  //   .pipe(takeUntil(this.subscription$))
  //   .subscribe((filterParams: FilterParams) => {
  //     this.updateDrugListByFilterParams(filterParams);
  //   });
}
